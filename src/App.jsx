import { useEffect, useState } from 'react';
import { ArrowRight, Check, CircleUserRound, Film, KeyRound, LogOut, Music2, ShieldCheck, Sparkles } from 'lucide-react';
import { createComment, createContent, createReview, getCurrentUser, listComments, listContent, listReviews, login, register } from './api';

const TOKEN_KEY = 'tapecloud_token';
const initialCredentials = { email: '', password: '' };

function routeFromHash() {
  return window.location.hash.replace('#/', '') || 'portal';
}

function useHashRoute() {
  const [route, setRoute] = useState(routeFromHash);
  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return route;
}

function go(route) {
  window.location.hash = `/${route}`;
}

function Logo() {
  return <img className="brand-logo" src="/images/TapeCloud.jpeg" alt="TapeCloud" />;
}

function Notice({ error, success }) {
  if (!error && !success) return null;
  return <p className={`notice ${error ? 'notice-error' : 'notice-success'}`}>{error || success}</p>;
}

function AuthShell({ children, eyebrow, title, copy }) {
  return (
    <main className="auth-page">
      <div className="auth-glow" />
      <section className="auth-card">
        <div className="auth-brand"><Logo /><span>TapeCloud</span></div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="muted auth-copy">{copy}</p>
        {children}
      </section>
    </main>
  );
}

function Field({ id, label, type = 'text', value, onChange, placeholder, required = true }) {
  const handleChange = event => {
    if (id === 'review-body') {
      window.dispatchEvent(new CustomEvent('review-body-change', { detail: event.target.value }));
      return;
    }
    onChange(event);
  };
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} name={id} type={type} value={value} onChange={handleChange} placeholder={placeholder} required={required} />
    </label>
  );
}

function Login({ onAuthenticated }) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault(); setError(''); setLoading(true);
    try { const response = await login(credentials); localStorage.setItem(TOKEN_KEY, response.token); onAuthenticated(response); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }

  return <AuthShell eyebrow="Inicio de sesión" title="Accede a TapeCloud" copy="Una sola cuenta para entrar a todas tus aplicaciones.">
    <form className="form-stack" onSubmit={submit}>
      <Notice error={error} />
      <Field id="email" label="Correo electrónico" type="email" value={credentials.email} onChange={e => setCredentials({ ...credentials, email: e.target.value })} placeholder="tu@empresa.com" />
      <Field id="password" label="Contraseña" type="password" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })} placeholder="Introduce tu contraseña" />
      <button className="button button-primary" disabled={loading}>{loading ? 'Validando...' : 'Iniciar sesión'} <ArrowRight size={17} /></button>
    </form>
    <div className="auth-footer"><span>¿Aún no tienes cuenta?</span><button className="link-button" onClick={() => go('register')}>Registrarte</button></div>
  </AuthShell>;
}

function Register({ onAuthenticated }) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function submit(event) {
    event.preventDefault(); setError('');
    if (credentials.password !== confirm) { setError('Las contraseñas no coinciden.'); return; }
    setLoading(true);
    try { const response = await register(credentials); localStorage.setItem(TOKEN_KEY, response.token); onAuthenticated(response); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }
  return <AuthShell eyebrow="Crear cuenta" title="Únete a TapeCloud" copy="Crea tu identidad y accede al ecosistema TapeCloud.">
    <form className="form-stack" onSubmit={submit}>
      <Notice error={error} />
      <Field id="email" label="Correo electrónico" type="email" value={credentials.email} onChange={e => setCredentials({ ...credentials, email: e.target.value })} placeholder="tu@empresa.com" />
      <Field id="password" label="Contraseña" type="password" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })} placeholder="Mínimo 6 caracteres" />
      <Field id="confirm" label="Confirmar contraseña" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repite tu contraseña" />
      <button className="button button-primary" disabled={loading}>{loading ? 'Creando...' : 'Crear cuenta'} <ArrowRight size={17} /></button>
    </form>
    <div className="auth-footer"><span>¿Ya tienes cuenta?</span><button className="link-button" onClick={() => go('login')}>Iniciar sesión</button></div>
  </AuthShell>;
}

function AppCard({ type, title, copy, action }) {
  const isFilm = type === 'film';
  return <article className={`app-card ${isFilm ? 'film-card' : 'music-card'}`}>
    <div className="card-topline"><span className="app-icon">{isFilm ? <Film size={22} /> : <Music2 size={22} />}</span><span className="card-kicker">Aplicación cliente</span></div>
    <div><h2>{title}</h2><p>{copy}</p></div>
    <button className="button button-light" onClick={action}>Abrir aplicación <ArrowRight size={17} /></button>
  </article>;
}

function Portal({ user, onLogout }) {
  return <main className="portal-page">
    <header className="topbar"><div className="brand-lockup"><Logo /><div><p className="eyebrow">Portal de aplicaciones</p><strong>TapeCloud</strong></div></div><div className="topbar-actions"><span className="user-chip"><CircleUserRound size={17} /> {user?.email || 'Usuario'}</span><button className="icon-button" title="Cerrar sesión" onClick={onLogout}><LogOut size={18} /></button></div></header>
    <div className="portal-content"><section className="portal-intro"><div><p className="eyebrow">Tu espacio privado</p><h1>Todo tu entretenimiento,<br /><em>en un solo lugar.</em></h1><p className="lead">Elige una aplicación para continuar con tu sesión segura de TapeCloud.</p></div><div className="status-badge"><ShieldCheck size={18} /><span>Sesión protegida</span></div></section>
      <section className="apps-grid"><AppCard type="film" title="TapeFlix" copy="Descubre películas y series, guarda tus favoritas y organiza lo que quieres ver." action={() => go('tapeflix')} /><AppCard type="music" title="TapeBeat" copy="Explora álbumes, artistas y playlists para construir tu propia banda sonora." action={() => go('tapebeat')} /></section>
      <section className="profile-strip"><div className="profile-avatar"><CircleUserRound size={28} /></div><div><p className="eyebrow">Cuenta activa</p><h3>{user?.email}</h3></div><div className="profile-actions"><button className="button button-quiet" onClick={() => go('password')}><KeyRound size={16} /> Cambiar contraseña</button></div></section>
      <p className="portal-footnote"><Sparkles size={14} /> Tu acceso está gestionado por TapeCloud SSO</p>
    </div>
  </main>;
}

function ProductPage({ kind, token, userEmail }) {
  const film = kind === 'tapeflix';
  const app = film ? 'TAPEFLIX' : 'TAPEBEAT';
  const [items, setItems] = useState([]); const [selected, setSelected] = useState(null); const [reviews, setReviews] = useState([]); const [comments, setComments] = useState({}); const [error, setError] = useState('');
  const [contentForm, setContentForm] = useState({ type: film ? 'Película' : 'Álbum', title: '', description: '', genre: '', releaseYear: '' });
  const [reviewForm, setReviewForm] = useState({ title: '', body: '', rating: 5 }); const [comment, setComment] = useState('');
  useEffect(() => { listContent(app).then(setItems).catch(e => setError(e.message)); }, [app]);
  useEffect(() => { const updateReviewBody = event => setReviewForm(previous => ({ ...previous, body: event.detail })); window.addEventListener('review-body-change', updateReviewBody); return () => window.removeEventListener('review-body-change', updateReviewBody); }, []);
  useEffect(() => { if (selected) listReviews(selected.id).then(async loadedReviews => { setReviews(loadedReviews); const loadedComments = await Promise.all(loadedReviews.map(async review => [review.id, await listComments(review.id)])); setComments(Object.fromEntries(loadedComments)); }).catch(e => setError(e.message)); }, [selected]);
  async function addContent(event) { event.preventDefault(); const requestedTitle = contentForm.title.trim().toLowerCase(); const duplicate = requestedTitle && items.some(item => { const existingTitle = item.title.toLowerCase(); return existingTitle.includes(requestedTitle) || requestedTitle.includes(existingTitle); }); if (duplicate) { window.alert('Ya existe contenido relacionado con ese título. No se creará otra publicación del mismo contenido.'); return; } try { const created = await createContent(token, { ...contentForm, app, releaseYear: contentForm.releaseYear ? Number(contentForm.releaseYear) : null }); setItems([...items, created].sort((a, b) => a.title.localeCompare(b.title))); setContentForm({ ...contentForm, title: '', description: '', genre: '', releaseYear: '' }); } catch (e) { setError(e.message); } }
  async function addReview(event) { event.preventDefault(); const alreadyReviewed = reviews.some(review => review.authorEmail.toLowerCase() === userEmail.toLowerCase()); if (alreadyReviewed && !window.confirm('Ya publicaste una reseña sobre este contenido. Pulsa Aceptar para crear otra o Cancelar para comentar una reseña existente.')) return; try { const created = await createReview(token, selected.id, reviewForm); setReviews([created, ...reviews]); setReviewForm({ title: '', body: '', rating: 5 }); } catch (e) { setError(e.message); } }
  async function addComment(event, reviewId) { event.preventDefault(); try { const created = await createComment(token, reviewId, { body: comment }); setComments({ ...comments, [reviewId]: [...(comments[reviewId] || []), created] }); setComment(''); } catch (e) { setError(e.message); } }
  const alreadyReviewed = false;
  return <main className={`product-page ${film ? 'product-film' : 'product-music'}`}><header className="product-topbar"><button className="back-button" onClick={() => go('portal')}>← Volver al portal</button><div className="product-mark">{film ? <Film size={17} /> : <Music2 size={17} />} {film ? 'TapeFlix' : 'TapeBeat'}</div><button className="icon-button" onClick={() => go('portal')}><LogOut size={18} /></button></header><section className="catalog-wrap"><div className="product-heading"><span className="eyebrow">Aplicación conectada</span><h1>{film ? 'Películas, series y opiniones.' : 'Música, álbumes y criterio propio.'}</h1><p>Descubre contenido, comparte tu reseña y conversa con la comunidad.</p></div><Notice error={error} /><div className="catalog-layout"><section><div className="section-heading"><h2>Catálogo</h2><span>{items.length} publicaciones</span></div><div className="content-grid">{items.map(item => <button className={`content-tile ${selected?.id === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setSelected(item)}><span className="tile-art">{film ? <Film size={30} /> : <Music2 size={30} />}</span><span className="tile-type">{item.type}</span><strong>{item.title}</strong><small>{item.genre}{item.releaseYear && ` · ${item.releaseYear}`}</small></button>)}</div><form className="inline-form" onSubmit={addContent}><h3>Subir contenido</h3><div className="form-row"><Field id="content-title" label="Título" value={contentForm.title} onChange={e => setContentForm({ ...contentForm, title: e.target.value })} placeholder="Nombre" /><Field id="content-genre" label="Género" value={contentForm.genre} onChange={e => setContentForm({ ...contentForm, genre: e.target.value })} placeholder="Género" /></div><Field id="content-description" label="Descripción" value={contentForm.description} onChange={e => setContentForm({ ...contentForm, description: e.target.value })} placeholder="Cuenta de qué trata" /><button className="button button-primary">Publicar contenido <ArrowRight size={17} /></button></form></section><aside className="reviews-panel">{selected ? <><span className="eyebrow">Detalle</span><h2>{selected.title}</h2><p className="muted">{selected.description}</p><div className="section-heading"><h3>Reseñas</h3><span>{reviews.length}</span></div>{reviews.map(review => <article className="review-item" key={review.id}><div className="review-top"><strong>{review.title}</strong><span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div><p>{review.body}</p><small>{review.authorEmail}</small>{(comments[review.id] || []).map(item => <div className="comment-item" key={item.id}><strong>{item.authorEmail}</strong><span>{item.body}</span></div>)}<form className="comment-form" onSubmit={e => addComment(e, review.id)}><input value={comment} onChange={e => setComment(e.target.value)} placeholder="Añadir comentario..." required /><button className="icon-button" title="Comentar"><ArrowRight size={16} /></button></form></article>)}{alreadyReviewed ? <div className="review-exists"><Check size={17} /> Ya publicaste una reseña sobre este contenido.</div> : <form className="review-form" onSubmit={addReview}><h3>Escribir reseña</h3><Field id="review-title" label="Título" value={reviewForm.title} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} placeholder="Tu opinión" /><Field id="review-body" label="Reseña" value={reviewForm.body} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} placeholder="Comparte tu experiencia" /><label className="field"><span>Calificación: {reviewForm.rating}/5</span><input type="range" min="1" max="5" value={reviewForm.rating} onChange={e => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })} /></label><button className="button button-primary">Publicar reseña <Check size={17} /></button></form>}</> : <div className="empty-detail"><Sparkles size={28} /><h2>Elige una publicación</h2><p>Selecciona un elemento del catálogo para ver reseñas y participar.</p></div>}</aside></div></section></main>;
}

function Password() {
  return <AuthShell eyebrow="Seguridad de cuenta" title="Actualiza tu contraseña" copy="Esta pantalla quedará conectada al flujo de cambio de contraseña del backend."><div className="coming-soon"><KeyRound size={17} /> Endpoint pendiente en Spring Boot</div><button className="button button-primary" onClick={() => go('portal')}>Volver al portal <ArrowRight size={17} /></button></AuthShell>;
}

export default function App() {
  const route = useHashRoute(); const [user, setUser] = useState(null); const [checking, setChecking] = useState(true);
  useEffect(() => { const token = localStorage.getItem(TOKEN_KEY); if (!token) { setChecking(false); return; } getCurrentUser(token).then(setUser).catch(() => localStorage.removeItem(TOKEN_KEY)).finally(() => setChecking(false)); }, []);
  function authenticated(response) { setUser({ email: response.email, roles: response.roles }); go('portal'); }
  function logout() { localStorage.removeItem(TOKEN_KEY); setUser(null); go('login'); }
  if (checking) return <div className="loading-screen"><Logo /><span>Conectando con TapeCloud...</span></div>;
  if (route === 'login' || (!user && route === 'portal')) return <Login onAuthenticated={authenticated} />;
  if (route === 'register') return <Register onAuthenticated={authenticated} />;
  if (route === 'password') return user ? <Password /> : <Login onAuthenticated={authenticated} />;
  if (route === 'tapeflix' || route === 'tapebeat') return user ? <ProductPage kind={route} token={localStorage.getItem(TOKEN_KEY)} userEmail={user.email} /> : <Login onAuthenticated={authenticated} />;
  return user ? <Portal user={user} onLogout={logout} /> : <Login onAuthenticated={authenticated} />;
}
