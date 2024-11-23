import { useLocalStorage } from '$lib/utils'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { api } from '$lib/axios-instance'
import { CYCLE, CYCLE_PERIOD } from '$lib/store'
import { get } from 'svelte/store'

export const load: PageLoad = async ({ fetch }) => {
  const API_URL = import.meta.env.VITE_API_URL

  const jwt_token = useLocalStorage('get', 'jwt_token')

  if (!jwt_token) {
    return redirect(302, '/account/signin/steps/email')
  }

  const cycleRes = await fetch(`${API_URL}/protected/cycle`)
  await cycleRes.json().then((data) => CYCLE.set(data.body.cycle))
  const cyclePeriodRes = await fetch(`${API_URL}/protected/cycle-period`)
  const cyclePeriodData = await cyclePeriodRes.json()

  CYCLE_PERIOD.set(cyclePeriodData.body.current_period)

  switch (cyclePeriodData.body.current_period.current_period) {
    case 'IDLE': {
      return redirect(302, '/protected/idle')
    }
    case 'PRE_TEST': {
      return redirect(302, '/protected/exam')
    }
    case 'SEMINAR': {
      return redirect(302, '/protected/seminar')
    }
    case 'POST_TEST': {
      return redirect(302, '/protected/exam')
    }
    case 'EVAL': {
      return redirect(302, '/protected/evaluatin')
    }
    case 'VOTING': {
      return redirect(302, '/protected/vote')
    }
  }
  const seminarListRes = await fetch(`${API_URL}/protected/seminar-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt_token}`
    },
    body: JSON.stringify({ cycle_id: get(CYCLE).id })
  })
  const seminarList = await seminarListRes.json()

  const totalVotesRes = await fetch(`${API_URL}/protected/votes/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt_token}`
    }
  })
  const totalVotes = await totalVotesRes.json()

  const votedRes = await fetch(`${API_URL}/protected/votes/did-user-vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt_token}`
    },
    body: JSON.stringify({
      cycle_id: get(CYCLE).id,
      user_id: useLocalStorage('get', 'user_id') || ''
    })
  })
  const voted = await votedRes.json()

  return {
    props: {
      seminarList,
      totalVotes,
      voted
    }
  }
}
