// src/components/Contact.jsx
export default function Contact() {
  return (
    <form
      className="max-w-3xl w-full grid grid-cols-1 gap-4 bg-white/5 border border-white/10 rounded-xl p-6"
      onSubmit={(e) => { e.preventDefault(); alert("Thanks! Replace alert with EmailJS/Formspree."); }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="bg-black/40 border border-white/10 rounded-md px-4 py-2 outline-none focus:border-cyan-400" placeholder="Your name" />
        <input className="bg-black/40 border border-white/10 rounded-md px-4 py-2 outline-none focus:border-cyan-400" placeholder="Email" type="email" />
      </div>
      <input className="bg-black/40 border border-white/10 rounded-md px-4 py-2 outline-none focus:border-cyan-400" placeholder="Subject" />
      <textarea className="bg-black/40 border border-white/10 rounded-md px-4 py-2 min-h-[140px] outline-none focus:border-cyan-400" placeholder="Message" />
      <button className="justify-self-start px-5 py-2.5 rounded-md bg-cyan-600 hover:bg-cyan-500 transition">Send</button>
    </form>
  );
}
