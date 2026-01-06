"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import { Application } from "./admin-types";

const SESSION_TIME_KEY = "admin_login_timestamp";
const SESSION_DURATION_SEC = 30 * 60;

export function useAdminAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [data, setData] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState<number>(SESSION_DURATION_SEC);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fetchData = useCallback(async () => {
        const { data: dbData, error } = await supabase
            .from("applications")
            .select("*")
            .order("created_at", { ascending: false });
        
        if (error) {
            toast.error("데이터 로드 실패");
        } else if (dbData) {
            setData(dbData as Application[]);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        sessionStorage.removeItem(SESSION_TIME_KEY);
        
        await supabase.auth.signOut();

        setUser(null);
        setData([]);
        
        setEmail("");
        setPassword("");

        toast.success("로그아웃 되었습니다.");
    }, []);

    const handleLogin = async () => {
        const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            toast.error("인증 실패: 정보를 확인하세요.");
        } else if (authData.user) {
            const now = Date.now().toString();
            sessionStorage.setItem(SESSION_TIME_KEY, now);
            setUser(authData.user);
            await fetchData();
            toast.success("관리자 인증 성공");
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const savedTime = sessionStorage.getItem(SESSION_TIME_KEY);
            
            if (session && savedTime) {
                const elapsed = Math.floor((Date.now() - parseInt(savedTime)) / 1000);
                if (elapsed < SESSION_DURATION_SEC) {
                    setUser(session.user);
                    setTimeLeft(SESSION_DURATION_SEC - elapsed);
                    await fetchData();
                } else {
                    handleLogout();
                }
            } 

            else if (session && !savedTime) {
                handleLogout();
            }

            else {
                setIsLoading(false);
                return; 
            }
            setIsLoading(false);
        };
        checkUser();
    }, [fetchData, handleLogout]);

    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            const saved = sessionStorage.getItem(SESSION_TIME_KEY);
            if (!saved) {
                handleLogout();
                return;
            }
            
            const elapsed = Math.floor((Date.now() - parseInt(saved)) / 1000);
            const remaining = Math.max(SESSION_DURATION_SEC - elapsed, 0);
            
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
                handleLogout();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [user, handleLogout]);

    return { 
        user, data, timeLeft, isLoading, 
        email, setEmail, password, setPassword, 
        handleLogin, handleLogout 
    };
}