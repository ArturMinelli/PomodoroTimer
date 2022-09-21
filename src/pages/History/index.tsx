import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function History() {
  const {cycles} = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

            {
              cycles.map((cycle) => {
                const cycleIsActive = (!cycle.finsishedDate && !cycle.interruptedDate)
                const cycleIsFinished = cycle.finsishedDate
                const cycleIsInterrupted = cycle.interruptedDate

                return(
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount}</td>
                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                        locale: ptBR,
                        addSuffix: true
                      })}
                    </td>
                    <td>
                      {cycleIsActive && <Status statusColor="yellow">Em andamento</Status>}
                      {cycleIsFinished && <Status statusColor="green">Concluído</Status>}
                      {cycleIsInterrupted && <Status statusColor="red">Interrompido</Status>}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
