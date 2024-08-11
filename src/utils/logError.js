import { supabase } from "./supabase";

export async function logError(message, details) {
    const { data, error } = await supabase
        .from('error_logs')
        .insert([{ message: message, details: JSON.stringify(details), created_at: new Date().toISOString() }]);

    if (error) {
        console.error('Error logging to Supabase:', error);
    } else {
        console.log('Error logged to Supabase:', data);
    }
}