import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { supabase } from '../utils/supabase';
import { logError } from '../utils/logError';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const NotificationProvider = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const initializeNotifications = async () => {
            try {
                const token = await registerForPushNotificationsAsync();
                if (token) {
                    setExpoPushToken(token);
                    await saveTokenToSupabase(token);
                }
            } catch (error) {
                logError('Failed to initialize notifications', error);
            }
        };

        initializeNotifications();

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification Response:', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const registerForPushNotificationsAsync = async () => {
        let token;

        try {
            if (Device.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;

                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }

                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!');
                    logError('Permission not granted for push notifications');
                    return null;
                }

                const experienceId = `@${Constants.expoConfig?.owner}/${Constants.expoConfig?.slug}`;

                console.log("experienceId", experienceId);


                token = (await Notifications.getExpoPushTokenAsync({ experienceId })).data;
                console.log('Expo Push Token:', token);
            } else {
                alert('Must use physical device for Push Notifications');
                logError('Attempted to use push notifications on a non-physical device');
                return null;
            }
        } catch (error) {
            logError('Error registering for push notifications', error);
        }

        return token;
    };

    const tokenExistsInSupabase = async (token) => {
        try {
            const { data, error } = await supabase
                .from('tokens_push_notification')
                .select('id')
                .eq('token', token);

            if (error) {
                logError('Error checking token in Supabase', error);
                return null;
            }

            return data && data.length > 0 ? data[0] : null;
        } catch (error) {
            logError('Unexpected error checking token in Supabase', error);
            return null;
        }
    };

    const saveTokenToSupabase = async (fullToken) => {
        try {
            const token = fullToken.match(/\[(.*?)\]/)[1];
            console.log('Parsed token:', token);

            const existingToken = await tokenExistsInSupabase(token);
            if (existingToken) {
                console.log('Token already exists in Supabase.');
                return;
            }

            const { error: supabaseError } = await supabase
                .from('tokens_push_notification')
                .insert([{ token }]);

            if (supabaseError) {
                throw new Error(supabaseError.message);
            }

            console.log('Token saved successfully to Supabase.');
        } catch (error) {
            logError('Error saving token to Supabase', error);
        }
    };

    const schedulePushNotification = async (title, body, data) => {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: title,
                    body: body,
                    data: data,
                },
                trigger: { seconds: 2 },
            });
        } catch (error) {
            logError('Error scheduling push notification', error);
        }
    };

    return (
        <NotificationContext.Provider value={{ expoPushToken, notification, schedulePushNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
