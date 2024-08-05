import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { supabase } from '../utils/supabase';

const NotificationContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token);
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
        let error = null; // Initialize error variable

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

            // // Save token to Supabase
            // const { error: supabaseError } = await supabase
            //     .from('expo_push_tokens')
            //     .insert([{ token }]);

            // if (supabaseError) {
            //     console.error('Error saving token to Supabase:', supabaseError);
            //     error = supabaseError; // Set error if any
            // }
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (error) {
            // Optionally handle the error, e.g., show a user-friendly message
        }

        return token;
    };

    const schedulePushNotification = async (title, body, data) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title || "You've got mail! 📬",
                body: body || 'Here is the notification body',
                data: data || { data: 'goes here', test: { test1: 'more data' } },
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
