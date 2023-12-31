import { LoginRequest } from "../../types/auth";
import { mockRequest } from "../request";

export function fetchLogin(params: LoginRequest){
    return mockRequest.post<{ token: string }>("/api/login", params);
}
export function fetchGetCode() {
    return mockRequest.get<{ code: string }>("/api/getCode");
  }