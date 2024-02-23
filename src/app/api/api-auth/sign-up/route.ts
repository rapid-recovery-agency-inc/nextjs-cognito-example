import {NextRequest, NextResponse} from "next/server";
import {CognitoIdentityProviderClient, SignUpCommand} from '@aws-sdk/client-cognito-identity-provider';
import {createHmac} from "crypto";

const client = new CognitoIdentityProviderClient({region: process.env.AWS_REGION});

export async function POST(request: NextRequest) {
    const res = await request.json();
    const {email, password, callbackUrl} = res;
    // Create a hash for the secret
    const hasher = createHmac('sha256', process.env.COGNITO_CLIENT_SECRET as string);
    hasher.update(`${email}${process.env.COGNITO_CLIENT_ID as string}`);
    const secretHash = hasher.digest('base64');
    // Signup command  for creating a new user
    const command = new SignUpCommand({
        SecretHash: secretHash,
        ClientId: process.env.COGNITO_CLIENT_ID as string,
        Username: email,
        Password: password,
        UserAttributes: [{Name: 'email', Value: email}],
    });

    const createUserInPool = await client
        .send(command);
    return NextResponse.json({createUserInPool, callbackUrl});
}
