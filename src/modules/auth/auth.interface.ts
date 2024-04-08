import { JwtPayload as JwtPayloadBase } from 'jsonwebtoken';

export interface JwtPayload extends JwtPayloadBase {
  id: string;
  email: string;
  name: string;
  role: string;
}
