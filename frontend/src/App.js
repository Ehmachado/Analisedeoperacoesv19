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
    const element = document.getElementById('export-content');
    if (!element) return;

    // Add export class for 4-column layout
    element.classList.add('export-mode');
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });

      // Compress the image
      const link = document.createElement('a');
      link.download = `super-barreiras-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 0.9);
      link.click();
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar imagem. Tente novamente.');
    } finally {
      element.classList.remove('export-mode');
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
            rows={3}
          />
        </div>
      );
    }

    if (type === 'select') {
      return (
        <div className="field-group">
          <Label htmlFor={field} className="field-label">{label}</Label>
          <Select value={value} onValueChange={(val) => handleChange(field, val)}>
            <SelectTrigger id={field} className="field-input">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              {options.items?.map(item => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        />
      </div>
    );
  };

  return (
    <div className="app-container">
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

      <div id="export-content" className="main-content">
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
            </CardContent>
          </Card>

          {/* Column 2 - Blue */}
          <Card className="column-card column-blue">
            <CardContent className="card-content">
              {renderField('Autorização Grão', 'autorizacaoGrao', 'textarea')}
              {renderField('Valor Operação', 'valorOperacao', 'currency')}
              {renderField('Seguros (Quais?)', 'seguros')}
              {renderField('RS contratado na operação', 'rsContratado', 'currency')}
              {renderField('Limite de Crédito (Vigência e Risco)', 'limiteCredito')}
              {renderField('Condicionante do LC (Qual?)', 'condicionanteLC')}
              {renderField('Receita Bruta Total Obtida', 'receitaBrutaObtida', 'currency')}
              {renderField('Receita Bruta Total Prevista', 'receitaBrutaPrevista', 'currency')}
              {renderField('Resultado Operacional Agropecuário Obtido', 'resultadoObtido', 'currency')}
              {renderField('Resultado Operacional Agropecuário Previsto', 'resultadoPrevisto', 'currency')}
              {renderField('Pecuária: Quantidade de animais compatível com área?', 'pecuariaCompativel', 'select', {
                items: ['Sim', 'Não', 'Não se aplica']
              })}
              {renderField('Justificativa Pecuária', 'justificativaPecuaria', 'textarea')}
              {renderField('Garantias', 'garantias')}
            </CardContent>
          </Card>

          {/* Column 3 - White */}
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
  );
}

export default App;