function calcular() {
    let nombre = document.getElementById("nombre").value;
    let salarioNominal = parseFloat(document.getElementById("salario").value);

    if (!nombre || isNaN(salarioNominal) || salarioNominal <= 0) {
        alert("Por favor, ingrese un nombre y un salario válido");
        return;
    }

    // 1. CÁLCULO DE DESCUENTOS (Con las fórmulas correctas)
    // ISSS: 3% 
    let isss = salarioNominal * 0.03;
    if (isss > 30) isss = 30;
    
    // AFP: 7.25% con tope de $581.21
    let afp = salarioNominal * 0.0725;
    if (afp > 581.21) afp = 581.21;

    let totalDescuentos = afp + isss;
    let salarioGravado = salarioNominal - totalDescuentos;

    let isr = 0;
    let tramo = "";
    let tramoColor = "";

    // 2. CÁLCULO DE ISR SEGÚN FÓRMULAS CORRECTAS
    
    if (salarioGravado <= 550.00) {
        tramo = "TRAMO I (Exento)";
        tramoColor = "exento";
        isr = 0;
    }
    else if (salarioGravado <= 895.24) {
        tramo = "TRAMO II (10%)";
        tramoColor = "tramo-ii";
        isr = 17.67 + (salarioGravado - 550.00) * 0.10;
    }
    else if (salarioGravado <= 2038.10) {
        tramo = "TRAMO III (20%)";
        tramoColor = "tramo-iii";
        isr = 60.00 + (salarioGravado - 895.24) * 0.20;
    }
    else {
        tramo = "TRAMO IV (30%)";
        tramoColor = "tramo-iv";
        isr = 288.57 + (salarioGravado - 2038.10) * 0.30;
    }

    // Redondear todos los valores a 2 decimales
    isss = Math.round(isss * 100) / 100;
    afp = Math.round(afp * 100) / 100;
    totalDescuentos = Math.round(totalDescuentos * 100) / 100;
    salarioGravado = Math.round(salarioGravado * 100) / 100;
    isr = Math.round(isr * 100) / 100;
    let salarioNeto = salarioNominal - totalDescuentos - isr;
    salarioNeto = Math.round(salarioNeto * 100) / 100;

    // 3. MOSTRAR RESULTADOS
    let resultado = document.getElementById("resultado");
    resultado.classList.remove("oculto");

    resultado.innerHTML = `
        <h2><i class="fas fa-chart-line"></i> Resultados del Cálculo</h2>
        
        <div class="result-grid">
            <div class="result-item">
                <span class="result-label"><i class="fas fa-user"></i> Empleado:</span>
                <span class="result-value">${nombre}</span>
            </div>
            
            <div class="result-item highlight">
                <span class="result-label"><i class="fas fa-money-bill-wave"></i> Sueldo:</span>
                <span class="result-value">$ ${salarioNominal.toFixed(2)}</span>
            </div>
            
            <div class="result-section-title">Descuentos de ley</div>
            
            <div class="result-item">
                <span class="result-label"><i class="fas fa-university"></i> AFP (7.25%):</span>
                <span class="result-value">$ ${afp.toFixed(2)}</span>
            </div>
            
            <div class="result-item">
                <span class="result-label"><i class="fas fa-heartbeat"></i> ISSS (3%):</span>
                <span class="result-value">$ ${isss.toFixed(2)}</span>
            </div>
            
            <div class="result-item total">
                <span class="result-label"><i class="fas fa-minus-circle"></i> Total descuentos:</span>
                <span class="result-value">$ ${totalDescuentos.toFixed(2)}</span>
            </div>
            
            <div class="result-item">
                <span class="result-label"><i class="fas fa-balance-scale"></i> Renta imponible:</span>
                <span class="result-value">$ ${salarioGravado.toFixed(2)}</span>
            </div>
            
            <div class="result-section-title">Retención de ISR</div>
            
            <div class="result-item ${tramoColor}">
                <span class="result-label"><i class="fas fa-layer-group"></i> Tramo aplicado:</span>
                <span class="result-value">${tramo}</span>
            </div>
            
            <div class="result-item isr">
                <span class="result-label"><i class="fas fa-file-invoice-dollar"></i> ISR a retener:</span>
                <span class="result-value">$ ${isr.toFixed(2)}</span>
            </div>
            
            <div class="result-item destacado final">
                <span class="result-label"><i class="fas fa-wallet"></i> Sueldo líquido:</span>
                <span class="result-value">$ ${salarioNeto.toFixed(2)}</span>
            </div>
        </div>
        
        
    `;

    // Agregar estilos para los tramos (si no existen ya)
    if (!document.querySelector('style[data-tramos="true"]')) {
        let style = document.createElement('style');
        style.setAttribute('data-tramos', 'true');
        style.innerHTML = `
            .tramo-ii { background-color: #e8f4fc; border-left: 4px solid #3498db; }
            .tramo-iii { background-color: #fff3cd; border-left: 4px solid #ffc107; }
            .tramo-iv { background-color: #f8d7da; border-left: 4px solid #dc3545; }
            .exento { background-color: #d4edda; border-left: 4px solid #28a745; }
            .isr { background-color: #f8f9fa; border-left: 4px solid #6c757d; font-weight: bold; }
        `;
        document.head.appendChild(style);
    }
}

function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("salario").value = "";

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    resultado.classList.add("oculto");
}

// Agregar funcionalidad de Enter para calcular
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('salario').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcular();
        }
    });
});