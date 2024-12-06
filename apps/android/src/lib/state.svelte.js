/**
 * Represents the context for the app bar.
 *
 * @class AppBarContext
 * @property {boolean} canGoBack - Indicates if the app can navigate back.
 * @property {boolean} inSettings - Indicates if the app is currently in the settings screen.
 * @property {string} title - The title of the app bar.
 * @property {'large' | 'medium' | 'small' | 'center-aligned'} variant - The variant of the app bar.
 */
class AppBarContext {
  /**
   * The title of the app bar.
   * @default 'Seminar Assess'
   * @type {string}
   */
  title = $state('Seminar Assess')

  /**
   * Indicates if the app can navigate back.
   * @default false
   * @type {boolean}
   */
  canGoBack = $state(false)

  /**
   * Indicates if the app is currently in the settings screen.
   * @default false
   * @type {boolean}
   */
  inSettings = $state(false)

  /**
   * The variant of the app bar.
   * @default 'large'
   * @type {'large' | 'medium' | 'small' | 'center-aligned'}
   */
  variant = $state('large')
}

export const appBarContext = new AppBarContext()
