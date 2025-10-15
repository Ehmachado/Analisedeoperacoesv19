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
    const exportContainer = document.getElementById('export-container');
    if (!exportContainer) return;

    try {
      // Create a clone for export
      const clone = exportContainer.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = '1800px';
      clone.style.background = '#ffffff';
      clone.style.padding = '20px';
      
      document.body.appendChild(clone);
      
      // Replace all inputs with their values as text
      const allInputs = clone.querySelectorAll('input[type="text"], input[type="date"], textarea');
      allInputs.forEach(input => {
        const value = input.value || '—';
        const span = document.createElement('div');
        span.textContent = value;
        span.style.cssText = `
          font-size: 1.15rem;
          padding: 0.7rem;
          background: white;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          min-height: 50px;
          display: flex;
          align-items: center;
          color: #0c1424;
          font-weight: 500;
        `;
        input.parentNode.replaceChild(span, input);
      });
      
      // Replace selects with their values
      const allSelects = clone.querySelectorAll('[role="combobox"]');
      allSelects.forEach(select => {
        const fieldName = select.getAttribute('data-field');
        const value = formData[fieldName] || 'Selecione...';
        const span = document.createElement('div');
        span.textContent = value;
        span.style.cssText = `
          font-size: 1.15rem;
          padding: 0.7rem;
          background: white;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          min-height: 50px;
          display: flex;
          align-items: center;
          color: #0c1424;
          font-weight: 500;
        `;
        select.parentNode.replaceChild(span, select);
      });
      
      // Hide buttons
      const buttons = clone.querySelector('.header-actions');
      if (buttons) buttons.style.display = 'none';
      
      // Apply export styles
      clone.classList.add('export-mode');
      
      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Capture with html2canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: false,
        windowWidth: 1800,
        windowHeight: clone.scrollHeight
      });
      
      // Remove clone
      document.body.removeChild(clone);
      
      // Download
      const link = document.createElement('a');
      link.download = `super-barreiras-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar imagem. Tente novamente.');
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
            className="field-input"
            rows={2}
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
          <Input
            id={field}
            value={value}
            onChange={(e) => handleCurrencyChange(field, e.target.value)}
            className="field-input"
            placeholder="R$ 0,00"
            data-field={field}
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
        <Input
          id={field}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          className="field-input"
          placeholder={label}
          data-field={field}
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
              </CardContent>
            </Card>

            {/* Column 2 - Yellow */}
            <Card className="column-card column-yellow">
              <CardContent className="card-content">
                {renderField('Proposta', 'proposta')}
                {renderField('Linha de Crédito', 'linhaCredito')}
                {renderField('Item Financiado', 'itemFinanciado')}
                {renderField('Rating', 'rating')}
                {renderField('Autorização Grão', 'autorizacaoGrao', 'textarea')}
              </CardContent>
            </Card>

            {/* Column 3 - Blue */}
            <Card className="column-card column-blue">
              <CardContent className="card-content">
                {renderField('Valor Operação', 'valorOperacao', 'currency')}
                {renderField('Seguros (Quais?)', 'seguros')}
                {renderField('RS contratado na operação', 'rsContratado', 'currency')}
                {renderField('Limite de Crédito (Vigência e Risco)', 'limiteCredito')}
                {renderField('Condicionante do LC (Qual?)', 'condicionanteLC')}
                {renderField('Receita Bruta Total Obtida', 'receitaBrutaObtida', 'currency')}
                {renderField('Receita Bruta Total Prevista', 'receitaBrutaPrevista', 'currency')}
              </CardContent>
            </Card>

            {/* Column 4 - Blue & White */}
            <Card className="column-card column-mixed">
              <CardContent className="card-content">
                {renderField('Resultado Operacional Agropecuário Obtido', 'resultadoObtido', 'currency')}
                {renderField('Resultado Operacional Agropecuário Previsto', 'resultadoPrevisto', 'currency')}
                {renderField('Pecuária: Quantidade de animais compatível com área?', 'pecuariaCompativel', 'select', {
                  items: ['Sim', 'Não', 'Não se aplica']
                })}
                {renderField('Justificativa Pecuária', 'justificativaPecuaria', 'textarea')}
                {renderField('Garantias', 'garantias')}
              </CardContent>
            </Card>
          </div>

          <div className="columns-grid columns-grid-bottom">
            {/* Bottom Column 1 - White */}
            <Card className="column-card column-white">
              <CardContent className="card-content">
                <div className="field-group">
                  <Label className="field-label">Share BB (%)</Label>
                  <div className="share-bb-value" title="Calculado automaticamente">
                    {shareBB}%
                  </div>
                </div>
                {renderField('Recursos Líquidos', 'recursosLiquidos', 'currency')}
                {renderField('Patrimônio Total', 'patrimonioTotal', 'currency')}
              </CardContent>
            </Card>

            {/* Bottom Column 2 - White */}
            <Card className="column-card column-white">
              <CardContent className="card-content">
                {renderField('Endividamento no SFN', 'endividamentoSFN', 'currency')}
                {renderField('Endividamento no BB', 'endividamentoBB', 'currency')}
                {renderField('Inad Agro Agência (rel 5398)', 'inadAgroAgencia', 'currency')}
              </CardContent>
            </Card>

            {/* Bottom Column 3 - White */}
            <Card className="column-card column-white">
              <CardContent className="card-content">
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