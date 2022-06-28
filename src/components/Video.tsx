import { DefaultUi, Player, Youtube } from "@vime/react"
import { gql, useQuery } from "@apollo/client"

import {
  DiscordLogo,
  Lightning,
  FileArrowDown,
  CaretRight,
  Image,
} from "phosphor-react"
import '@vime/core/themes/default.css'
import { useGetLessonBySlugQuery } from "../graphql/generated"


interface VideoProps {
  lessonSlug: string
}

export function Video(props: VideoProps) {

  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: props.lessonSlug,
    }
  })

  if(!data || !data.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="w-full h-full max-w-[1100px] max-4-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId}/>
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="mb-4 text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>
            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6">
              <img
                className="border-2 border-blue-500 rounded-full w-16 h-16"
                src={data.lesson.teacher.avatarURL}
                alt="avatar-teacher"
              />
              <div className="leading-relaxed">
                <strong className="text-2xl block">{data.lesson.teacher.name}</strong>
                <span className="text-sm text-gray-200 whitespace-nowrap block">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="flex justify-center items-center gap-[10px] bg-green-500 rounded text-sm font-bold uppercase px-6 py-4 hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              comunidade no discord
            </a>
            <a
              href="#"
              className="flex justify-center items-center gap-[10px] rounded border border-blue-500 text-blue-500 font-bold uppercase px-6 py-4 hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24} />
              acesse o desafio
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 max-w-2xl grid grid-cols-1 xl:grid-cols-2 xl:max-w-max">
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center text-blue-500">
              <CaretRight size={24} />
            </div>
          </a>
          <a
            href="#"
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center text-blue-500">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
