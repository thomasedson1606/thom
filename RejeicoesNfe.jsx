import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, BookOpen, ExternalLink, AlertTriangle } from 'lucide-react';
import rejeicoesData from '../data/rejeicoes_nfe.json';
import './RejeicoesNfe.css';

const RejeicoesNfe = ({ onBack, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRejeicoes = useMemo(() => {
    if (!searchTerm) return rejeicoesData;
    const lowerSearch = searchTerm.toLowerCase();
    return rejeicoesData.filter(item => 
      item.codigo.toLowerCase().includes(lowerSearch) ||
      item.resultado.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  return (
    <motion.div 
      className={`rejeicoes-container ${theme}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="rejeicoes-header">
        <h1>
          <BookOpen className="rejeicoes-icon" size={32} />
          Manual de Rejeições NF-e
        </h1>
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} /> Voltar ao Dashboard
        </button>
      </div>

      <div className="rejeicoes-content">
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon-inside" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar por código (ex: 204) ou texto..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="results-count">
            {filteredRejeicoes.length} {filteredRejeicoes.length === 1 ? 'resultado' : 'resultados'}
          </div>
        </div>

        <div className="rejeicoes-list">
          <AnimatePresence>
            {filteredRejeicoes.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="no-results"
              >
                <AlertTriangle size={48} opacity={0.5} />
                <p>Nenhuma rejeição encontrada para "{searchTerm}".</p>
              </motion.div>
            ) : (
              filteredRejeicoes.map((item, index) => (
                <motion.div 
                  key={`${item.codigo}-${index}`}
                  className="rejeicao-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index < 20 ? index * 0.02 : 0 }}
                >
                  <div className="rejeicao-codigo">
                    <span>Cód. {item.codigo}</span>
                  </div>
                  <div className="rejeicao-texto">
                    {item.resultado}
                  </div>
                  <div className="rejeicao-actions">
                    {(item.linkCodigo || item.linkSolucao) && (
                      <a 
                        href={item.linkCodigo || item.linkSolucao} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-solucao"
                        title="Ver solução detalhada na TecnoSpeed"
                      >
                        <ExternalLink size={16} /> Ver Solução
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default RejeicoesNfe;
