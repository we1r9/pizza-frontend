import { Component } from 'react'
import { RefreshCw } from 'lucide-react'

import styles from './styles.module.css'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          className={styles.errorPage}
          role="alert"
        >
          <span aria-hidden="true" className={styles.errorEmoji}>
            *_^
          </span>

          <h1 className={styles.errorTitle}>
            Что-то пошло не так⁭
          </h1>

          <p className={styles.errorText}>
            Попробуйте обновить страницу
          </p>

          <button
            type="button"
            className={styles.refreshButton}
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={16} strokeWidth={2.5} />
            Обновить
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
