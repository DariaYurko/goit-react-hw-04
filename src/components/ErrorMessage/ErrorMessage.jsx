import css from './ErrorMessage.module.css'
function ErrorMessage({ error }) {
   return (
      <p className={css.error}>Error! {error}. Try later.</p >
   )
}

export default ErrorMessage;