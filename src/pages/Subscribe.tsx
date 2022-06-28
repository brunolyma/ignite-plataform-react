import { gql, useMutation } from "@apollo/client"
import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { Logo } from "../components/Logo"
import { useCreateSubscriberMutation } from "../graphql/generated"


export function Subscribe() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault()

    await createSubscriber({
      variables: {
        name,
        email,
      },
    })

    navigate("/event")
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className=" w-full max-w-[1200px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px] ">
          <Logo />

          <h1 className="text-[2.5rem] leading-tight mt-8">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="text-gray-200 mt-6 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="font-bold text-2xl block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              className="bg-gray-900 h-14 px-5 rounded"
              type="text"
              placeholder="Seu nome completo"
              name="fullName"
              id="fullName"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="bg-gray-900 h-14 px-5 rounded"
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              className="rounded mt-4 font-bold text-sm uppercase bg-green-500 py-4 hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={loading}
              type="submit"
            >
              garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img
        src="./src/assets/code-mockup.png"
        alt="code-screen-mockup"
        className="mt-10 max-w-[1200px]"
      />
    </div>
  )
}
