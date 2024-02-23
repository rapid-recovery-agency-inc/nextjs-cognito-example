import {NextRequest, NextResponse} from "next/server";
import {CognitoIdentityProviderClient, InitiateAuthCommand} from '@aws-sdk/client-cognito-identity-provider';
import {createHmac} from 'crypto';


const client = new CognitoIdentityProviderClient({region: process.env.AWS_REGION});

export async function POST(request: NextRequest, response: NextResponse) {
    const res = await request.json();
    console.log("DEBUG:ROUTE:POST ", res);
    const {email, password, callbackUrl} = res;
    // Create a hash for the secret
    const hasher = createHmac('sha256', process.env.COGNITO_CLIENT_SECRET as string);
    hasher.update(`${email}${process.env.COGNITO_CLIENT_ID as string}`);
    const secretHash = hasher.digest('base64');
    // Signup command  for creating a new user
    const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH', // enable this authflow on your aws account
        AuthParameters: {
            PASSWORD: password,
            USERNAME: email,
            SECRET_HASH: secretHash,
        },
        ClientId: process.env.COGNITO_CLIENT_ID as string,
    });

    const userLogin = await client
        .send(command)

    return NextResponse.json({userLogin, callbackUrl});
}
