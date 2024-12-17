/* eslint-disable no-undef */

/**
 * Context for the app state.
 *
 * @class AppContext
 * @property {boolean} isInitialLoad - Indicates if app is loaded for the first time.
 * @property {string} isAnsweringEvaluation - Indicates if answering evaluation and not done. Store the link if true.
 * @property {boolean} isKeyboardVisible - Indicates if keyboard is on-screen
 */
class AppContext {
  /**
   * Indicates if the app is loaded for the first time.
   * @type {boolean}
   * @default true
   */
  isInitialLoad = $state(true)

  /**
   * Indicates if answering evaluation and not done.
   * Store the link if true.
   * @type {string}
   * @default ''
   */
  isAnsweringEvaluation = $state('')

  /**
   * Indicates if keyboard is on-screen
   * @type {boolean}
   * default false
   */
  isKeyboardVisible = $state(false)

  /**
   * @type {HTMLElement | null}
   */
  mainElement = $state(null)
}

/**
 * Context for the app bar.
 *
 * @class AppBarContext
 * @property {HTMLElement | null} appBarElement - The app bar element.
 * @property {boolean} canGoBack - Indicates if the app can navigate back.
 * @property {string} title - The title of the app bar.
 * @property {'large' | 'medium' | 'small' | 'center-aligned'} variant - The variant of the app bar.
 */
class AppBarContext {
  /**
   * The app bar element.
   * @default null
   * @type {HTMLElement | null}
   */
  appBarElement = $state(null)

  /**
   * The title of the app bar.
   * @default 'Seminar Assess'
   * @type {string}
   */
  title = $state('')

  /**
   * Indicates if the app can navigate back.
   * @default false
   * @type {boolean}
   */
  canGoBack = $state(false)

  /**
   * The variant of the app bar.
   * @default 'large'
   * @type {'large' | 'medium' | 'small' | 'center-aligned'}
   */
  variant = $state('large')
}

/**
 * Context for the app state.
 *
 * @class SessionContext
 * @property {string} token - Session token of the current user.
 * @property {string | undefined} cycleId - ID of the current cycle.
 * @property {string | undefined} period - Period of the current cycle.
 * @property {string[]} evaluationIds - Evaluation category list.
 */
class SessionContext {
  /**
   * Session token of the current user.
   * @default ''
   * @type {string | null}
   */
  token = $state('')

  /**
   * ID of the current cycle.
   * @default ''
   * @type {string | undefined}
   */
  cycleId = $state('')

  /**
   * Period of the current cycle.
   * @default ''
   * @type {string | undefined}
   */
  period = $state('')

  /**
   * Evaluation category list.
   * @default []
   * @type {import("./types").EvaluationCategory[]}
   */
  evaluationCategories = $state([])
}

export const appContext = new AppContext()
export const appBarContext = new AppBarContext()
export const sessionContext = new SessionContext()
