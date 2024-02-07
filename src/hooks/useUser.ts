import { useEffect, useState } from "react";
import { getLoginToken, setLoginToken } from "../services/storage";

export interface UserInfo {
  email: string;
  token: string;
}

// 1. 토큰이 있는지 확인
//1-1. 토큰이 없다면 null 리턴
//  1-2. 토큰이 있다면 서버에서 유저데이터 받아오기
// 2. 유저데이터 리턴
// 3. 만약 만료된 토큰이며 에러라면 토큰삭제(로그아웃과 같은 프로세스)
export function useUser() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const token = getLoginToken();

  useEffect(() => {
    if (!token) setUser(null);
    else {
      //TODO: 서버와 통신하고 유저 데이터를 받아오는 코드
      // 로딩 스테이트 필요시 추가
      setUser({ email: "asd@asd.com", token: token });
    }
  }, [token]);

  // useEffect(() => {}, []);

  const logout = () => {
    setLoginToken("");
    window.location.reload();
  };

  return { user, logout };
}