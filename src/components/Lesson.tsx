import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import Classnames from 'classnames'
import classNames from 'classnames';

interface LessonProps {
  title: string,
  slug: string,
  availableAt: Date,
  type: 'live' | 'class'
}

export function Lesson(props: LessonProps) {
  
  const {slug} = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt,
     "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {locale: ptBR })

  const isActiveLesson = slug === props.slug

  return (
    <Link to={`/event/lesson/${props.slug}`} className='group'>
      <span className={classNames("text-gray-300", {
        "text-white": isActiveLesson
      })}>
            {availableDateFormatted.charAt(0).toUpperCase() + availableDateFormatted.slice(1)}
      </span>
      <div className={classNames("border rounded border-gray-600 p-4 mt-2 mb-2 group-hover:border-green-500 transition-colors",{
          "bg-green-500 border-green-500": isActiveLesson && isLessonAvailable,
          "bg-gray-700 border-gray-600 group-hover:border-gray-600 group-hover:cursor-not-allowed": !isLessonAvailable
      })}>
        <header className="flex items-center justify-between">
            {isLessonAvailable ? (
              <span className={classNames("text-sm font-medium flex gap-2 items-center",{
                "text-white": isActiveLesson,
                "text-blue-500": !isActiveLesson,
              })}>  
                <CheckCircle size={20}/>
                Conteúdo Liberado
              </span>
            ) : (
              <span className="text-sm text-orange-500 font-medium flex gap-2 items-center">  
                  <Lock size={20}/>
                  Em breve
              </span>
            )}
            {props.type == 'live' ? (
              <span className={Classnames("text-xs px-2 py-[0.125rem] text-gren-400 border border-green-400 rounded font-bold",{
                "border-white text-white": isActiveLesson,
                "text-green-400": !isActiveLesson
              })}>
                  AO VIVO
              </span>
            ) : (
              <span className={classNames("text-xs px-2 py-[0.125rem] text-white border border-green-400 rounded font-bold", {
                "border-white": isActiveLesson && isLessonAvailable,
              })}>
                  AULA PRÁTICA
              </span>
            )}
        </header>
        <strong className={Classnames("mt-5 block",{
          "text-white": isActiveLesson && isLessonAvailable,
          "text-gray-200": !isActiveLesson 
        })}>
            {props.title}
        </strong>
      </div>
    </Link>
  )
}
