import { HandPalm, Play } from 'phosphor-react'
import { CyclesContext, NewCycleFormData } from '../../contexts/CyclesContext'
import { FormProvider, useForm } from 'react-hook-form'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import { useContext } from 'react'

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    defaultValues: {
      task: '',
      minutesAmount: 50,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitDisabled = !task || !minutesAmount

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
      <StopCountDownButton onClick={interruptCurrentCycle} type="button">
        <HandPalm size={24} />
        Interromper
      </StopCountDownButton>
        ) : (
      <StartCountDownButton disabled={isSubmitDisabled} type="submit">
        <Play size={24} />
        Começar
      </StartCountDownButton>)}

      </form>
    </HomeContainer>
  )
}
