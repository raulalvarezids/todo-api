import { JwtService } from '@nestjs/jwt';

export const generateToken = async (payload) => {

    const jwtService = new JwtService

    const options = {
        secret:process.env.SECRET,
        expiresIn : '1h'
    }
    
    return {token : await jwtService.signAsync(payload,options)}

}