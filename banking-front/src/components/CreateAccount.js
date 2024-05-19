import React, { useState } from "react";
import axios from "axios";

function CreateAccount() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3100/create",
        formData
      );
      alert(response.data.msg);
    } catch (error) {
      console.error(error);
      alert("Error creating account");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div class="h-screen w-screen bg-slate-800 flex flex-col items-center ">
      <h2 class="text-white text-4xl font-bold m-4 p-4">Create Account</h2>
      <form onSubmit={handleSubmit} class="flex flex-col">
        <div class="m-1 p-1">
          <label for="acId" class="text-white cursor-pointer">
            Account ID:
          </label>
          <input
            class="rounded bg-slate-500 ml-2 text-white"
            type="text"
            id="acId"
            name="acId"
            onChange={handleChange}
          />
        </div>
        <div class="m-1 p-1">
          <label for="acNm" class="text-white cursor-pointer">
            Account Name:
          </label>
          <input
            class="rounded bg-slate-500 ml-2 text-white"
            type="text"
            id="acNm"
            name="acNm"
            onChange={handleChange}
          />
        </div>
        <div class="m-1 p-1">
          <label for="email" class="text-white cursor-pointer">
            Email:
          </label>
          <input
            class="rounded bg-slate-500 ml-2 text-white"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div class="m-1 p-1">
          <label for="balance" class="text-white cursor-pointer">
            Balance:
          </label>
          <input
            class="rounded bg-slate-500 ml-2 text-white"
            type="number"
            id="balance"
            name="balance"
            onChange={handleChange}
          />
        </div>
        <button
          class=" m-4 text-white text-xl p-2 rounded bg-blue-500 hover:bg-blue-700"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateAccount;
