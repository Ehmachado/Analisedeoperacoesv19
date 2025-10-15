import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Card, CardContent } from './components/ui/card';
import { Eye, Download, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';

function App() {
  const [isPrintPreview, setIsPrintPreview] = useState(false);
  const [formData, setFormData] = useState({
    prefixo: '',
    agencia: '',
    alcada: '',
    mci: '',
    cliente: '',
    idadeCliente: '',
    clienteDesde: '',
    proposta: '',
    linhaCredito: '',
    itemFinanciado: '',
    rating: '',
    autorizacaoGrao: '',
    valorOperacao: '',
    seguros: '',
    rsContratado: '',
    limiteCredito: '',
    condicionanteLC: '',
    receitaBrutaObtida: '',
    receitaBrutaPrevista: '',
    resultadoObtido: '',
    resultadoPrevisto: '',
    pecuariaCompativel: '',
    justificativaPecuaria: '',
    garantias: '',
    recursosLiquidos: '',
    patrimonioTotal: '',
    endividamentoSFN: '',
    endividamentoBB: '',
    inadAgroAgencia: '',
    propostaCustomizada: '',
    percentualGarantiaHipotecaria: '',
    rendeFacil: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('superBarreirasData');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar dados:', e);
      }
    }
  }, []);

  // Auto-save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('superBarreirasData', JSON.stringify(formData));
  }, [formData]);

  // Calculate Share BB automatically
  const shareBB = useMemo(() => {
    const sfn = parseFloat(formData.endividamentoSFN.replace(/\D/g, '')) || 0;
    const bb = parseFloat(formData.endividamentoBB.replace(/\D/g, '')) || 0;
    if (sfn === 0) return '0,00';
    return ((bb / sfn) * 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [formData.endividamentoSFN, formData.endividamentoBB]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    const formatted = (parseInt(number) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return formatted;
  };

  const handleCurrencyChange = (field, value) => {
    const formatted = formatCurrency(value);
    handleChange(field, formatted);
  };

  const clearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados?')) {
      setFormData({
        prefixo: '',
        agencia: '',
        alcada: '',
        mci: '',
        cliente: '',
        idadeCliente: '',
        clienteDesde: '',
        proposta: '',
        linhaCredito: '',
        itemFinanciado: '',
        rating: '',
        autorizacaoGrao: '',
        valorOperacao: '',
        seguros: '',
        rsContratado: '',
        limiteCredito: '',
        condicionanteLC: '',
        receitaBrutaObtida: '',
        receitaBrutaPrevista: '',
        resultadoObtido: '',
        resultadoPrevisto: '',
        pecuariaCompativel: '',
        justificativaPecuaria: '',
        garantias: '',
        recursosLiquidos: '',
        patrimonioTotal: '',
        endividamentoSFN: '',
        endividamentoBB: '',
        inadAgroAgencia: '',
        propostaCustomizada: '',
        percentualGarantiaHipotecaria: '',
        rendeFacil: ''
      });
      localStorage.removeItem('superBarreirasData');
    }
  };

  const exportToPNG = async () => {
    // Ativar modo de pré-visualização para renderizar valores
    setIsPrintPreview(true);
    
    // Aguardar React atualizar o DOM
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const exportContainer = document.getElementById('export-container');
    if (!exportContainer) {
      alert('Erro: Container de exportação não encontrado');
      setIsPrintPreview(false);
      return;
    }

    try {
      console.log('Iniciando exportação PNG 4:3 harmônica...');
      
      // Adicionar classe de exportação para estilos especiais
      exportContainer.classList.add('export-mode');
      
      // Aguardar fontes carregarem
      await document.fonts.ready;
      
      // Aguardar renderização completa
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Capturar em formato 4:3 de alta qualidade (2048x1536)
      const canvas = await html2canvas(exportContainer, {
        scale: 2.5,
        backgroundColor: '#0a1929',
        logging: false,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        imageTimeout: 0,
        width: 2048,
        height: 1536,
        windowWidth: 2048,
        windowHeight: 1536,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          console.log('Aplicando estilos de exportação harmônica...');
          
          const clonedContainer = clonedDoc.getElementById('export-container');
          if (clonedContainer) {
            // Aplicar estilos para exportação bonita
            clonedContainer.style.width = '2048px';
            clonedContainer.style.height = '1536px';
            clonedContainer.style.overflow = 'hidden';
            clonedContainer.style.background = 'linear-gradient(135deg, #0a1929 0%, #1a3a5c 50%, #2a56c6 100%)';
            
            // Esconder os botões de ação
            const buttons = clonedContainer.querySelector('.header-actions');
            if (buttons) buttons.style.display = 'none';
            
            // Ajustar o header para a exportação
            const header = clonedContainer.querySelector('.app-header');
            if (header) {
              header.style.padding = '1.5rem 2rem';
              header.style.background = 'linear-gradient(135deg, #003399 0%, #0047b3 50%, #2a56c6 100%)';
              header.style.borderBottom = '3px solid #ffcc00';
            }
            
            const title = clonedContainer.querySelector('.app-title');
            if (title) {
              title.style.fontSize = '2.5rem';
              title.style.marginBottom = '0.5rem';
            }
            
            const subtitle = clonedContainer.querySelector('.app-subtitle');
            if (subtitle) {
              subtitle.style.fontSize = '1rem';
            }
            
            // Ajustar o conteúdo principal
            const mainContent = clonedContainer.querySelector('.main-content');
            if (mainContent) {
              mainContent.style.padding = '2rem';
              mainContent.style.maxWidth = '100%';
            }
            
            // Ajustar as colunas para melhor aproveitamento do espaço 4:3
            const columnsGrid = clonedContainer.querySelector('.columns-grid');
            if (columnsGrid) {
              columnsGrid.style.gap = '1.5rem';
            }
            
            // Ajustar campos para melhor legibilidade na exportação
            const fieldLabels = clonedContainer.querySelectorAll('.field-label');
            fieldLabels.forEach(label => {
              label.style.fontSize = '0.85rem';
              label.style.fontWeight = '700';
            });
            
            const printValues = clonedContainer.querySelectorAll('.print-value');
            printValues.forEach(value => {
              value.style.fontSize = '1.1rem';
              value.style.padding = '0.75rem';
              value.style.minHeight = '45px';
            });
            
            // Ajustar Share BB para destaque
            const shareBB = clonedContainer.querySelector('.share-bb-value');
            if (shareBB) {
              shareBB.style.fontSize = '2rem';
              shareBB.style.padding = '1rem';
            }
          }
        }
      });

      console.log('Canvas gerado com sucesso!');
      
      // Remover classe de exportação
      exportContainer.classList.remove('export-mode');
      
      // Baixar imagem
      const link = document.createElement('a');
      link.download = `super-barreiras-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 0.95);
      link.click();
      
      console.log('Exportação concluída!');
      
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar imagem. Detalhes no console.');
      exportContainer.classList.remove('export-mode');
    } finally {
      // Desativar modo de pré-visualização
      setIsPrintPreview(false);
    }
  };

  const renderField = (label, field, type = 'text', options = {}) => {
    const value = formData[field];
    
    if (isPrintPreview) {
      return (
        <div className="field-group">
          <Label className="field-label">{label}</Label>
          <div className="print-value">{value || '—'}</div>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="field-group">
          <Label htmlFor={field} className="field-label">{label}</Label>
          <Textarea
            id={field}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="field-input field-textarea"
            rows={3}
            data-field={field}
          />
        </div>
      );
    }

    if (type === 'select') {
      return (
        <div className="field-group">
          <Label htmlFor={field} className="field-label">{label}</Label>
          <Select value={value} onValueChange={(val) => handleChange(field, val)}>
            <SelectTrigger id={field} className="field-input" data-field={field}>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {options.items?.map(item => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" className="select-value-export" data-field={field} value={value || 'Selecione...'} />
        </div>
      );
    }

    if (type === 'currency') {
      return (
        <div className="field-group">
          <Label htmlFor={field} className="field-label">{label}</Label>
          <Textarea
            id={field}
            value={value}
            onChange={(e) => handleCurrencyChange(field, e.target.value)}
            className="field-input field-textarea"
            placeholder="R$ 0,00"
            data-field={field}
            rows={1}
          />
        </div>
      );
    }

    if (type === 'date') {
      return (
        <div className="field-group">
          <Label htmlFor={field} className="field-label">{label}</Label>
          <Input
            id={field}
            type="date"
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="field-input"
            data-field={field}
          />
        </div>
      );
    }

    return (
      <div className="field-group">
        <Label htmlFor={field} className="field-label">{label}</Label>
        <Textarea
          id={field}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          className="field-input field-textarea"
          placeholder={label}
          data-field={field}
          rows={1}
        />
      </div>
    );
  };

  return (
    <div className="app-container">
      <div id="export-container" className="export-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">SUPER BARREIRAS</h1>
            <p className="app-subtitle">Super Barreiras — Análise de Operações</p>
          </div>
          <div className="header-actions">
            <Button
              onClick={() => setIsPrintPreview(!isPrintPreview)}
              variant={isPrintPreview ? 'default' : 'outline'}
              className="action-button"
            >
              <Eye className="button-icon" />
              {isPrintPreview ? 'Editar' : 'Pré-visualizar'}
            </Button>
            <Button onClick={exportToPNG} className="action-button export-button">
              <Download className="button-icon" />
              Exportar PNG
            </Button>
            <Button onClick={clearAll} variant="destructive" className="action-button">
              <Trash2 className="button-icon" />
              Limpar
            </Button>
          </div>
        </header>

        <div className="main-content">
          <div className="fixed-fields">
            {renderField('Prefixo', 'prefixo')}
            {renderField('Agência', 'agencia')}
          </div>

          <div className="columns-grid">
            {/* Column 1 - Yellow */}
            <Card className="column-card column-yellow">
              <CardContent className="card-content">
                {renderField('Alçada', 'alcada')}
                {renderField('MCI', 'mci')}
                {renderField('Cliente', 'cliente')}
                {renderField('Idade do Cliente', 'idadeCliente')}
                {renderField('Cliente desde', 'clienteDesde', 'date')}
                {renderField('Proposta', 'proposta')}
                {renderField('Linha de Crédito', 'linhaCredito')}
                {renderField('Item Financiado', 'itemFinanciado')}
                {renderField('Rating', 'rating')}
                {renderField('Autorização Grão', 'autorizacaoGrao', 'textarea')}
              </CardContent>
            </Card>

            {/* Column 2 - Blue */}
            <Card className="column-card column-blue">
              <CardContent className="card-content">
                {renderField('Valor Operação', 'valorOperacao', 'currency')}
                {renderField('Seguros (Quais?)', 'seguros')}
                {renderField('RS contratado na operação', 'rsContratado', 'currency')}
                {renderField('Limite de Crédito (Vigência e Risco)', 'limiteCredito')}
                {renderField('Condicionante do LC (Qual?)', 'condicionanteLC')}
                {renderField('Receita Bruta Total Obtida', 'receitaBrutaObtida', 'currency')}
                {renderField('Receita Bruta Total Prevista', 'receitaBrutaPrevista', 'currency')}
                {renderField('Resultado Operacional Agropecuário Obtido', 'resultadoObtido', 'currency')}
                {renderField('Resultado Operacional Agropecuário Previsto', 'resultadoPrevisto', 'currency')}
                {renderField('Garantias', 'garantias')}
              </CardContent>
            </Card>

            {/* Column 3 - Purple/Mixed */}
            <Card className="column-card column-mixed">
              <CardContent className="card-content">
                {renderField('Pecuária: Quantidade de animais compatível com área?', 'pecuariaCompativel', 'select', {
                  items: ['Sim', 'Não', 'Não se aplica']
                })}
                {renderField('Justificativa Pecuária', 'justificativaPecuaria', 'textarea')}
                <div className="field-group">
                  <Label className="field-label">Share BB (%)</Label>
                  <div className="share-bb-value" title="Calculado automaticamente">
                    {shareBB}%
                  </div>
                </div>
                {renderField('Recursos Líquidos', 'recursosLiquidos', 'currency')}
                {renderField('Patrimônio Total', 'patrimonioTotal', 'currency')}
                {renderField('Endividamento no SFN', 'endividamentoSFN', 'currency')}
                {renderField('Endividamento no BB', 'endividamentoBB', 'currency')}
                {renderField('Inad Agro Agência (rel 5398)', 'inadAgroAgencia', 'currency')}
                {renderField('Proposta Customizada', 'propostaCustomizada', 'select', {
                  items: ['Sim', 'Não', 'Não se aplica']
                })}
                {renderField('% de operações com garantia hipotecária', 'percentualGarantiaHipotecaria')}
                {renderField('Rende Fácil', 'rendeFacil', 'select', {
                  items: ['Sim', 'Não', 'Não se aplica']
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;