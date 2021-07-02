import React from 'react';
import './styles.css'

import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

const Intro: React.FC = () => {
  return (
    <div id='page-home'>
        <div className="content">
          <main>
              <h1>Agrupador, o seu centralizador</h1>
              <p>Ache o link para grupos de estudos próximos a sua localização.</p>

              <Link to="/groups">
                  <span><FiLogIn /></span>
                  <strong>Encontrar Grupos!</strong>
              </Link>
          </main>
        </div>
    </div>
  );
}

export default Intro;