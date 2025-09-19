import { Request, Response } from "express"
import { constructHTTPResponse } from "src/common/helpers"
import { loginUser, register } from "src/services/auth"
import { verifyOtpAndSignJwt } from "src/services/auth/auth"

export const signUpUser = async (req: Request, res: Response) => {
    const { fullName, email, phoneNumber, password } = req.body

    const response = await register({ fullName, email, phoneNumber, password })

    return res.status(201).json(constructHTTPResponse(response))
}

export const signInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const response = await loginUser({ email, password })

    return res.status(200).json(constructHTTPResponse(response))
}

export const verifyEmail = async (req: Request, res: Response) => {
    const { otp } = req.body

    const response = await verifyOtpAndSignJwt(otp)

    return res.status(200).json(constructHTTPResponse(response))
}