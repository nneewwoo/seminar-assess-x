<script lang="ts">
  import '@material/web/button/filled-button'
  import '@material/web/textfield/outlined-text-field'
  import '@material/web/button/text-button'
  import { page } from '$app/stores'
  import LoadingBar from '$lib/components/LoadingBar.svelte'
  import { navigateTo, useLocalStorage } from '$lib/utils'
  import type { IResponse } from '$lib/types'

  let loading = $state(false)

  let timeout = $state('')

  type ErrorResponse = { error: string }

  const givenName = $page.url.searchParams.get('givenName') as string
  const familyName = $page.url.searchParams.get('familyName') as string
  const email = $page.url.searchParams.get('email') as string

  let otp = $state('')
  let focused = $state(false)

  let otpError = $state('')

  const calculateTimer = () => {
    const tempEmail = useLocalStorage('get', 'temp_email')
    const storedTimeout = useLocalStorage('get', 'otp_timeout')
    const currentTime = Date.now()

    if (tempEmail !== email || !storedTimeout) {
      const otpTimeout = currentTime + 5 * 60 * 1000 // 5 minutes
      useLocalStorage('set', 'otp_timeout', otpTimeout.toString())
      useLocalStorage('set', 'temp_email', email)
      timeout = 'Resend in 5:00'
      return
    }

    const timeoutDate = parseInt(storedTimeout, 10)
    const timeLeft = timeoutDate - currentTime

    if (timeLeft <= 0) {
      timeout = 'Resend'
      return
    }

    const minutes = Math.floor(timeLeft / (60 * 1000))
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000)
    timeout = `Resend in ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    return
  }

  const handleSubmit = async () => {
    loading = true
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/account/signup/steps/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: otp })
        }
      )

      const data = (await res.json()) as IResponse<ErrorResponse>

      if (data.success) {
        useLocalStorage('remove', 'otp_timeout')
        useLocalStorage('remove', 'temp_email')
        navigateTo('/account/signup/steps/password', {
          params: { givenName, familyName, email }
        })
      }

      otpError = data.body?.error as string
    } catch (error) {
      console.error('API call failed:', error)
    }
    loading = false
  }

  let hiddenInputElement: HTMLInputElement

  const handleFocus = () => {
    hiddenInputElement.focus()
    focused = true
  }

  const handleResend = async () => {
    loading = true

    try {
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/account/security/otp/request`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, givenName })
        }
      )
      const _data = await request.json()
    } catch (error) {
      console.error('API call failed:', error)
    }

    useLocalStorage('remove', 'otp_timeout')
    useLocalStorage('remove', 'temp_email')
    loading = false
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const allowedKeys = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'Backspace'
    ]
    if (allowedKeys.includes(event.key)) {
      if (event.key === 'Backspace') {
        otpError = ''
        otp = otp.slice(0, -1)
      } else {
        if (otp.length === 6) return
        otp += event.key
      }
    }
  }

  $effect(() => {
    $effect(() => {
      const interval = setInterval(() => {
        calculateTimer()
      }, 1000)
      return () => clearInterval(interval)
    })
  })
</script>

<svelte:window onkeydown={handleKeyDown} />

<LoadingBar {loading} />
<div class="flex-1 flex flex-col">
  <div class="mb-8">
    <h1>Verify email</h1>
    <span class="text-xl"
      >Enter the OTP code sent to your email to continue.</span>
  </div>

  <form class="gap-y-4 flex flex-col" onsubmit={handleSubmit}>
    <input
      bind:this={hiddenInputElement}
      type="number"
      class="h-0 w-0 focus:outline-none focus:right-0" />
    <input type="hidden" name="givenName" value={givenName} />
    <input type="hidden" name="familyName" value={familyName} />
    <input type="hidden" name="email" value={email} />
    <div class="flex flex-col">
      <button
        type="button"
        onclick={handleFocus}
        class="flex focus:outline-none focus:right-0 justify-between cursor-default">
        <div
          class={`w-12 h-14 flex items-center justify-center rounded-md ${otpError ? 'border-[rgb(186,_26,_26)] border-2' : focused && otp.length === 0 ? 'border-[--md-sys-color-primary] border-2' : 'border-[#006a6a] border'}`}>
          <span class={`${otpError && 'text-[rgb(186,_26,_26)]'} text-2xl`}
            >{otp[0]}</span>
        </div>
        <div
          class={`w-12 h-14 flex items-center justify-center rounded-md ${otpError ? 'border-[rgb(186,_26,_26)] border-2' : focused && otp.length === 1 ? 'border-[--md-sys-color-primary] border-2' : 'border-[#006a6a] border'}`}>
          <span class={`${otpError && 'text-[rgb(186,_26,_26)]'} text-2xl`}
            >{otp[1]}</span>
        </div>
        <div
          class={`w-12 h-14 flex items-center justify-center rounded-md ${otpError ? 'border-[rgb(186,_26,_26)] border-2' : focused && otp.length === 2 ? 'border-[--md-sys-color-primary] border-2' : 'border-[#006a6a] border'}`}>
          <span class={`${otpError && 'text-[rgb(186,_26,_26)]'} text-2xl`}
            >{otp[2]}</span>
        </div>
        <div
          class={`w-12 h-14 flex items-center justify-center rounded-md ${otpError ? 'border-[rgb(186,_26,_26)] border-2' : focused && otp.length === 3 ? 'border-[--md-sys-color-primary] border-2' : 'border-[#006a6a] border'}`}>
          <span class={`${otpError && 'text-[rgb(186,_26,_26)]'} text-2xl`}
            >{otp[3]}</span>
        </div>
        <div
          class={`w-12 h-14 flex items-center justify-center rounded-md ${otpError ? 'border-[rgb(186,_26,_26)] border-2' : focused && otp.length === 4 ? 'border-[--md-sys-color-primary] border-2' : 'border-[#006a6a] border'}`}>
          <span class={`${otpError && 'text-[rgb(186,_26,_26)]'} text-2xl`}
            >{otp[4]}</span>
        </div>
        <div
          class={`w-12 h-14 flex items-center justify-center rounded-md ${otpError ? 'border-[rgb(186,_26,_26)] border-2' : focused && otp.length === 5 ? 'border-[--md-sys-color-primary] border-2' : 'border-[#006a6a] border'}`}>
          <span class={`${otpError && 'text-[rgb(186,_26,_26)]'} text-2xl`}
            >{otp[5]}</span>
        </div>
      </button>
      <div
        class="text-[rgb(186,_26,_26)] pt-1 text-xs flex gap-x-3 gap-y-3 justify-between ps-4 pe-4">
        {otpError}
      </div>
    </div>
    <div class="w-full flex justify-between">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <md-text-button
        disabled={timeout !== 'Resend'}
        class="-ml-3"
        onclick={handleResend}
        type="button">{timeout}</md-text-button>
      <md-filled-button disabled={loading || otp.length < 6} type="submit"
        >Verify</md-filled-button>
    </div>
  </form>
</div>
