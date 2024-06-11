import { useEffect } from 'react'
import { useStoreContext } from '@/client/lib/store'

const fetchState = (setState: Function, setUpdatedOn: Function) => {
  fetch('/api/state')
    .then((res) => res.json())
    .then((json) => {
      setState(json)
      const updatedOn = new Date()
      setUpdatedOn(updatedOn)
      console.log(updatedOn.toISOString(), json)
    })
    .catch((e) => console.log('Error fetching state: ', e))
}

const useStore = () => {
  const { setState, setUpdatedOn } = useStoreContext()
  useEffect(() => fetchState(setState, setUpdatedOn), [setState, setUpdatedOn])
}

export default useStore
