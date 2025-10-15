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
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const exportContainer = document.getElementById('export-container');
    if (!exportContainer) {
      alert('Erro: Container de exportação não encontrado');
      setIsPrintPreview(false);
      return;
    }

    try {
      console.log('Iniciando exportação PNG...');
      
      // Aguardar fontes carregarem
      await document.fonts.ready;
      
      // Aguardar mais um pouco para garantir renderização
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Configurações otimizadas do html2canvas para MODO PAISAGEM
      const canvas = await html2canvas(exportContainer, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        imageTimeout: 0,
        windowWidth: 2800,
        windowHeight: 1600,
        onclone: (clonedDoc) => {
          console.log('Clone criado, processando estilos...');
          
          const clonedContainer = clonedDoc.getElementById('export-container');
          if (clonedContainer) {
            // Garantir background branco
            clonedContainer.style.backgroundColor = '#ffffff';
            clonedContainer.style.padding = '30px';
            
            // Esconder botões no clone
            const buttons = clonedContainer.querySelector('.header-actions');
            if (buttons) buttons.style.display = 'none';
            
            // CABEÇALHO - Cores BB
            const header = clonedContainer.querySelector('.app-header');
            if (header) {
              header.style.background = 'linear-gradient(135deg, #003399 0%, #0047b3 50%, #2a56c6 100%)';
              header.style.borderBottom = '4px solid #ffcc00';
              header.style.padding = '2rem';
            }
            
            // TÍTULO - Gradiente Dourado BB
            const title = clonedContainer.querySelector('.app-title');
            if (title) {
              title.style.fontSize = '5rem';
              title.style.fontWeight = '800';
              title.style.background = 'linear-gradient(135deg, #ffcc00 0%, #ffe680 50%, #ffffff 100%)';
              title.style.webkitBackgroundClip = 'text';
              title.style.webkitTextFillColor = 'transparent';
              title.style.backgroundClip = 'text';
            }
            
            // SUBTÍTULO
            const subtitle = clonedContainer.querySelector('.app-subtitle');
            if (subtitle) {
              subtitle.style.fontSize = '1.8rem';
              subtitle.style.color = '#ffe680';
            }
            
            // LABELS - Tamanho aumentado
            const labels = clonedContainer.querySelectorAll('.field-label');
            labels.forEach(label => {
              label.style.fontSize = '1.445rem';
              label.style.color = '#1a202c';
              label.style.fontWeight = '700';
              label.style.textTransform = 'uppercase';
            });
            
            // VALORES DOS CAMPOS - Tamanho aumentado e quebra de texto
            const printValues = clonedContainer.querySelectorAll('.print-value');
            printValues.forEach(pv => {
              pv.style.fontSize = '1.8rem';
              pv.style.fontWeight = '500';
              pv.style.color = '#1a202c';
              pv.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
              pv.style.border = '2px solid rgba(226, 232, 240, 0.6)';
              pv.style.padding = '1.5rem';
              pv.style.borderRadius = '16px';
              pv.style.minHeight = '80px';
              pv.style.display = 'flex';
              pv.style.alignItems = 'center';
              pv.style.wordWrap = 'break-word';
              pv.style.wordBreak = 'break-word';
              pv.style.overflowWrap = 'break-word';
              pv.style.whiteSpace = 'normal';
              pv.style.lineHeight = '1.4';
              pv.style.maxWidth = '100%';
            });
            
            // SHARE BB - Tamanho aumentado
            const shareBB = clonedContainer.querySelector('.share-bb-value');
            if (shareBB) {
              shareBB.style.fontSize = '3.5rem';
              shareBB.style.fontWeight = '800';
              shareBB.style.padding = '2rem';
              shareBB.style.backgroundColor = 'white';
              shareBB.style.borderRadius = '20px';
              shareBB.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
              shareBB.style.webkitBackgroundClip = 'text';
              shareBB.style.webkitTextFillColor = 'transparent';
              shareBB.style.backgroundClip = 'text';
            }
            
            // CARDS - Cores corretas
            const yellowCards = clonedContainer.querySelectorAll('.column-yellow');
            yellowCards.forEach(card => {
              card.style.background = 'rgba(251, 191, 36, 0.9)';
            });
            
            const blueCards = clonedContainer.querySelectorAll('.column-blue');
            blueCards.forEach(card => {
              card.style.background = 'rgba(96, 165, 250, 0.9)';
            });
            
            const whiteCards = clonedContainer.querySelectorAll('.column-white');
            whiteCards.forEach(card => {
              card.style.background = 'rgba(255, 255, 255, 0.95)';
            });
            
            const mixedCards = clonedContainer.querySelectorAll('.column-mixed');
            mixedCards.forEach(card => {
              card.style.background = 'rgba(196, 181, 253, 0.9)';
            });
          }
        }
      });

      console.log('Canvas gerado com sucesso!');
      
      // Baixar imagem
      const link = document.createElement('a');
      link.download = `super-barreiras-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
      console.log('Exportação concluída!');
      
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar imagem. Detalhes no console.');
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