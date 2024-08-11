import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { supabase } from '../utils/supabase';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export const NotificationProvider = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token);
                // Save token to Supabase
                saveTokenToSupabase(token);
            }
        });

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const registerForPushNotificationsAsync = async () => {
        let token;

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    };

    const tokenExistsInSupabase = async (token) => {
        const { data, error } = await supabase
            .from('tokens_push_notification')
            .select('id')
            .eq('token', token);

        if (error) {
            return null;
        }

        if (data && data.length > 0) {
            return data[0]; // return the first match
        } else {
            return null;
        }
    };

    const saveTokenToSupabase = async (fullToken) => {
        try {
            const token = fullToken.match(/\[(.*?)\]/)[1];

            // Check if token already exists in Supabase
            const existingToken = await tokenExistsInSupabase(token);
            if (existingToken) {
                return;
            }

            // Insert new token
            const { error: supabaseError } = await supabase
                .from('tokens_push_notification')
                .insert([{ token }]);

            if (supabaseError) {
                throw new Error(supabaseError.message);
            }
        } catch (error) {
            console.log('Error saving token to Supabase:', error);
        }
    };

    const schedulePushNotification = async (title, body, data) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: data,
            },
            trigger: { seconds: 2 },
        });
    };

    return (
        <NotificationContext.Provider value={{ expoPushToken, notification, schedulePushNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
