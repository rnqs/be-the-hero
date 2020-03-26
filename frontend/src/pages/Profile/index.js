import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api.get(`ongs/${ongId}/incidents`).then(res => {
      setIncidents(res.data);
    });
  }, [ongId, refresh]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setRefresh(!refresh);
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="/casos/novo">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
