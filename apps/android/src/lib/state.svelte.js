/* eslint-disable no-undef */

/**
 * Context for the app state.
 *
 * @class AppContext
 * @property {boolean} isInitialLoad - Indicates if the app is loaded for the first time.
 * @property {string} isAnsweringEvaluation - Indicates if the app is answering an evaluation and not yet done; stores a link if true.
 * @property {boolean} isKeyboardVisible - Indicates if the keyboard is on-screen.
 * @property {HTMLElement | null} mainElement - The main HTML element of the app.
 */
class AppContext {
  /**
   * Indicates if the app is loaded for the first time.
   * @type {boolean}
   * @default true
   */
  isInitialLoad = $state(true)

  /**
   * Indicates if the app is answering an evaluation and not yet done.
   * Stores the link if true.
   * @type {string}
   * @default ''
   */
  isAnsweringEvaluation = $state('')

  /**
   * Indicates if the keyboard is on-screen.
   * @type {boolean}
   * @default false
   */
  isKeyboardVisible = $state(false)

  /**
   * The main HTML element of the app.
   * @type {HTMLElement | null}
   * @default null
   */
  mainElement = $state(null)
}

/**
 * Context for the app bar.
 *
 * @class AppBarContext
 * @property {HTMLElement | null} appBarElement - The app bar element.
 * @property {string} title - The title of the app bar.
 * @property {boolean} canGoBack - Indicates if the app can navigate back.
 * @property {'large' | 'medium' | 'small' | 'center-aligned'} variant - The variant of the app bar.
 */
class AppBarContext {
  /**
   * The app bar HTML element.
   * @type {HTMLElement | null}
   * @default null
   */
  appBarElement = $state(null)

  /**
   * The title of the app bar.
   * @type {string}
   * @default 'Seminar Assess'
   */
  title = $state('Seminar Assess')

  /**
   * Indicates if the app can navigate back.
   * @type {boolean}
   * @default false
   */
  canGoBack = $state(false)

  /**
   * The variant of the app bar.
   * @type {'large' | 'medium' | 'small' | 'center-aligned'}
   * @default 'large'
   */
  variant = $state('large')
}

/**
 * Context for the session state.
 *
 * @class SessionContext
 * @property {string} token - The session token of the current user.
 * @property {string | undefined} cycleId - The ID of the current cycle.
 * @property {string | undefined} period - The period of the current cycle.
 * @property {import("./types").EvaluationCategory[]} evaluationCategories - A list of evaluation categories.
 */
class SessionContext {
  /**
   * The session token of the current user.
   * @type {string}
   * @default ''
   */
  token = $state('')

  /**
   * The ID of the current cycle.
   * @type {string | undefined}
   * @default ''
   */
  cycleId = $state('')

  /**
   * The period of the current cycle.
   * @type {string | undefined}
   * @default ''
   */
  period = $state('')

  /**
   * A list of evaluation categories.
   * @type {import("./types").EvaluationCategory[]}
   * @default []
   */
  evaluationCategories = $state([])
}

/**
 * Context for the navigation bar.
 *
 * @class NavBarContext
 * @property {import('mdui/components/navigation-bar').NavigationBar | null} element - The navigation bar element.
 */
class NavBarContext {
  /**
   * The navigation bar HTML element.
   * @type {import('mdui/components/navigation-bar').NavigationBar | null}
   * @default null
   */
  element = $state(null)
}

/**
 * Context for the snack bar.
 *
 * @class SnackBarContext
 * @property {import("mdui/components/snackbar").Snackbar | null} element - The snackbar element.
 * @property {string} message - The message displayed in the snack bar.
 */
class SnackBarContext {
  /**
   * The snackbar element.
   * @type {import("mdui/components/snackbar").Snackbar | null}
   * @default null
   */
  element = $state(null)
  /**
   * The message displayed in the snack bar.
   * @type {string}
   * @default ''
   */
  message = $state('')
}

export const appContext = new AppContext()
export const appBarContext = new AppBarContext()
export const sessionContext = new SessionContext()
export const navBarContext = new NavBarContext()
export const snackBarContext = new SnackBarContext()
