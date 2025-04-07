import { NextResponse } from 'next/server';
import { getWebflowProjects } from '@/app/lib/webflowProjects';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  // Vérification de sécurité avec le token d'autorisation
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ 
      success: false, 
      message: 'Unauthorized' 
    }, { status: 401 });
  }

  try {
    // Récupération des projets Webflow
    const projects = await getWebflowProjects();
    
    // Revalidation du cache pour les pages qui utilisent ces données
    revalidatePath('/');
    
    return NextResponse.json({
      success: true,
      message: 'Webflow data refreshed successfully',
      projectsCount: projects?.length || 0,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error refreshing Webflow data:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to refresh Webflow data' 
    }, { status: 500 });
  }
}