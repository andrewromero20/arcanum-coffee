import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
export const revalidate = 0; // Obligar a Next.js a traer datos frescos siempre

export default async function AdminDashboard({ searchParams }) {
  // 1. Obtener la clave ingresada desde la URL (?password=...)
  const passwordIngresada = (await searchParams)?.password;
  const CLAVE_SECRETA = "arcanum2026"; //contraseña para acceder al dashboard

  // 2. Si la contraseña no es correcta, renderizamos el formulario de bloqueo
  if (passwordIngresada !== CLAVE_SECRETA) {
    return (
      <div className="bg-white text-slate-100 min-h-screen flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-amber-900/60 border border-amber-900 p-8 rounded-2xl text-center shadow-xl">
          <h1 className="text-xl font-bold text-white mb-2">Acceso al dashboard de Arcanum</h1>
          <p className="text-slate-800 text-sm mb-6">Introduce la clave del administrador para ver los leads y mensajes.</p>
          
          <form method="GET" className="flex flex-col gap-3">
            <input 
              name="password" 
              type="password" 
              placeholder="Contraseña del sistema" 
              className="p-3 rounded-xl bg-white border border-amber-900 text-slate-950 focus:outline-none focus:border-amber-500 text-center"
              required 
            />
            <button type="submit" className="bg-black hover:bg-green-600 text-white font-bold p-3 rounded-xl text-sm transition-all">
              Ingresar al Dashboard
            </button>
          </form>
          {passwordIngresada && (
            <p className="text-amber-500 text-xs font-semibold mt-4">⚠️ Clave incorrecta. Inténtalo de nuevo.</p>
          )}
        </div>
      </div>
    );
  }

  // 3. Si la contraseña es correcta, consultamos los datos de Neon en paralelo
  const [suscriptores, mensajes] = await Promise.all([
    prisma.newsLetter.findMany({ orderBy: { creadoEn: 'desc' } }),
    prisma.contacto.findMany({ orderBy: { creadoEn: 'desc' } })
  ]);

  return (
    <div className="bg-white text-slate-100 min-h-screen font-sans">
      <header className="border-b border-slate-900 bg-white/80 sticky top-0 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 text-2xl font-black tracking-widest text-green-600">
            <Image 
              src="/images/logo-arcanum.png" 
              alt="Icono Arcanum Coffee"
              width={32}                  
              height={32}                 
              className="object-contain"
            />
            <div>
              ARCANUM <span className="text-amber-900 font-light text-lg">COFFEE</span>
            </div>
          </div>
          <Link href="/" className="text-xs text-white hover:text-green-600 transition-colors bg-amber-900 px-4 py-2 rounded-lg border border-slate-800">
            ← Volver a la Landing
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-12">
        
        {/* TABLA 1: NEWSLETTER */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              Suscriptores  ({suscriptores.length})
            </h2>
          </div>
          <div className="bg-black border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-700 border-b border-slate-800 text-xs font-bold text-white uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Correo Electrónico</th>
                  <th className="p-4">Fecha de Registro</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-800/60">
                {suscriptores.length === 0 ? (
                  <tr><td colSpan="3" className="p-4 text-center text-slate-500 italic">Nadie se ha suscrito aún...</td></tr>
                ) : (
                  suscriptores.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-slate-500 font-mono text-xs">#{sub.id}</td>
                      <td className="p-4 font-semibold text-slate-200">{sub.email}</td>
                      <td className="p-4 text-slate-400 text-xs">{new Date(sub.creadoEn).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* TABLA 2: FORMULARIO DE CONTACTO */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
              Mensajes Recibidos ({mensajes.length})
            </h2>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-700 border-b border-slate-800 text-xs font-bold text-white uppercase tracking-wider">
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Mensaje</th>
                  <th className="p-4">Fecha</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-800/60">
                {mensajes.length === 0 ? (
                  <tr><td colSpan="4" className="p-4 text-center text-slate-500 italic">No hay mensajes entrantes...</td></tr>
                ) : (
                  mensajes.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-bold text-amber-400">{msg.nombre}</td>
                      <td className="p-4 text-slate-300 font-medium">{msg.email}</td>
                      <td className="p-4 text-slate-400 max-w-xs break-words leading-relaxed">{msg.mensaje}</td>
                      <td className="p-4 text-slate-500 text-xs">{new Date(msg.creadoEn).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}