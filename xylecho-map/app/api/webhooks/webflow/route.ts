// app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import { myWebflowClient } from '@/app/lib/webflowClient';
import { revalidatePath } from 'next/cache';

const WEBHOOK_SECRET = process.env.WEBFLOW_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  try {
    // Extraire les headers et le body
    const headers = Object.fromEntries(request.headers);
    const body = await request.json();
    
    // Vérifier la signature du webhook
    const isValidRequest = await myWebflowClient.webhooks.verifySignature({
      headers,
      body: JSON.stringify(body),
      secret: WEBHOOK_SECRET
    });

    if (!isValidRequest) {
      console.error('Signature de webhook invalide');
      return NextResponse.json({ error: 'Signature invalide' }, { status: 401 });
    }

    //console.log('Webhook reçu et validé :', stringBody);
    
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors du traitement du webhook :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}