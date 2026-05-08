"use client"

import { useEffect, useState } from "react"

type User = {
  id: number
  name: string
  email: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  async function fetchUsers() {
    const res = await fetch("http://localhost:8001/users")
    const data = await res.json()

    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function createUser(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch("http://localhost:8001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })

    if (res.ok) {
      setName("")
      setEmail("")

      fetchUsers()
    }
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Collabr Users
      </h1>

      <form
        onSubmit={createUser}
        className="space-y-4 mb-10"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-xl w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-xl w-full"
        />

        <button
          type="submit"
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Create User
        </button>
      </form>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded-xl"
          >
            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-gray-600">
              {user.email}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}