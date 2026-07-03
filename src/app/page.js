import Link from 'next/link';
import { registrarNewsletter, registrarContacto } from './acciones/arcanumActions';

export default async function ArcanumLanding({ searchParams }) {
  // Capturamos si la URL trae confirmaciones de éxito o error
  const parametros = await searchParams;
  const msgNewsletter = parametros?.newsOk;
  const msgContacto = parametros?.contOk;
  const errNewsletter = parametros?.newsErr;

  return (
    <div className="bg-white text-slate-100 min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950">
      
      <header className="border-b border-slate-900 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className=" inline-block text-2xl font-black tracking-widest text-green-600">
            ARCANUM <span className="text-amber-900 font-light text-lg">COFFEE</span>
          </div>
          <Link href="/admin" className="border border-amber-900/30 hover:border-green-600 hover:text-green-600 text-amber-900 font-bold px-5 py-2 rounded-full text-sm transition-all">
            Dashboard Admin
          </Link>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none"
          style={{ backgroundImage: "url('/images/granos-cafe.avif')" }} // Cambia esto por la ruta de tu imagen
        />
        <div className="max-w-3xl relative z-10">
          <span className="text-white-600 text-xs font-bold tracking-widest uppercase bg-white-500/10 px-4 py-1.5 rounded-full border border-white-500/20">
            El arte de la extracción mística
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-6 tracking-tight leading-tight">
            Descubre el secreto oculto en cada grano
          </h1>
          <p className="text-white text-lg mt-6 max-w-xl mx-auto font-light leading-relaxed">
            En Arcanum Coffee no solo servimos café; transformamos granos seleccionados mediante procesos artesanales y precisos de alquimia.
          </p>
        </div>
      </section>
    
      {/* 3. FORMULARIO: NEWSLETTER */}
      <section className="max-w-4xl mx-auto px-6 py-12 bg-amber-950/60 border border-slate-900 rounded-3xl my-8 text-center relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-2">Únete a la Alquimia Secreta</h2>
        <p className="text-white-400 text-sm mb-6 max-w-md mx-auto">
          Recibe invitaciones a catas privadas, lanzamientos de lotes exclusivos y secretos de extracción manual.
        </p>
        
        {/* Mensajes de feedback */}
        {msgNewsletter && <p className="text-emerald-400 text-sm font-semibold mb-4">✨ ¡Te has suscrito con éxito al conocimiento del café!</p>}
        {errNewsletter && <p className="text-amber-500 text-sm font-semibold mb-4">⚠️ El correo ya está registrado.</p>}

        <form action={registrarNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            name="email" 
            type="email" 
            placeholder="Tu correo electrónico" 
            className="flex-grow p-3.5 rounded-xl bg-white border border-slate-300 text-black focus:outline-none focus:border-amber-500 transition-colors" 
            required 
          />
          <button type="submit" className="bg-slate-950 hover:bg-green-600 text-white-950 font-black px-6 py-3.5 rounded-xl text-sm transition-all whitespace-nowrap">
            Suscribirme
          </button>
        </form>
      </section>

      {/* 4. FORMULARIO: CONTACTO */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-center text-black mb-2">Escríbenos al Oráculo</h2>
        <p className="text-center text-black text-sm mb-8">¿Quieres eventos, franquicias o dudas sobre nuestros granos? Déjanos un mensaje.</p>
        
        {msgContacto && <p className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center font-bold mb-6">📬 ¡Mensaje enviado con éxito! Nos comunicaremos pronto.</p>}

        <form action={registrarContacto} className="flex flex-col gap-4 bg-amber-950/60 p-8 rounded-2xl border border-slate-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">Nombre</label>
              <input name="nombre" type="text" className="w-full p-3 rounded-xl bg-white border border-slate-800 text-white focus:outline-none focus:border-amber-500" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">Email</label>
              <input name="email" type="email" className="w-full p-3 rounded-xl bg-white border border-slate-800 text-white focus:outline-none focus:border-amber-500" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1">Mensaje</label>
            <textarea name="mensaje" rows="4" className="w-full p-3 rounded-xl bg-white border border-slate-800 text-white focus:outline-none focus:border-amber-500 resize-none" required></textarea>
          </div>
          <button type="submit" className="w-full bg-slate-950 hover:bg-green-600 text-white font-black p-4 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/10">
            Enviar Mensaje
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 text-center py-8 text-xs text-slate-500">
        <p>&copy; 2026 Arcanum Coffee Inc. Todos los secretos reservados.</p>
      </footer>
    </div>
  );
}