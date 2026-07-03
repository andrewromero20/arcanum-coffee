'use server'; // 👈 Esto le indica a Next.js que este código corre 100% en el servidor

import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

// 1. ACCIÓN PARA EL NEWSLETTER
export async function registrarNewsletter(formData) {
  const email = formData.get('email');

  if (!email) return;

  try {
    // Intentamos guardar el suscriptor en Neon
    await prisma.newsLetter.create({
      data: { email: email }
    });
  } catch (error) {
    // Si la base de datos dice que el email ya existe (error de registro único)
    console.log("El correo ya estaba registrado.");
    redirect('/?newsErr=true');
  }

  // Si todo sale bien, refrescamos la página con un mensaje de éxito en la URL
  redirect('/?newsOk=true');
}

// 2. ACCIÓN PARA EL FORMULARIO DE CONTACTO
export async function registrarContacto(formData) {
  const nombre = formData.get('nombre');
  const email = formData.get('email');
  const mensaje = formData.get('mensaje');

  if (!nombre || !email || !mensaje) return;

  // Guardamos el mensaje en la tabla Contacto de Neon
  await prisma.contacto.create({
    data: {
      nombre: nombre,
      email: email,
      mensaje: mensaje
    }
  });

  // Redirigimos confirmando que el mensaje fue enviado
  redirect('/?contOk=true');
}