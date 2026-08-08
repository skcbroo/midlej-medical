/* ================= DATA (exemplo — editar aqui) =================
   1 registro = semana × consultor × canal
   topo  = tentativas (outbound) | leads (inbound)
   meio  = contatos efetivos (outbound) | leads qualificados (inbound)
   agen  = reuniões agendadas · real = realizadas · vendas · receita (R$)
   speed = speed-to-lead médio em minutos (só inbound)               */
const CONSULTORES = ["Victor Hugo","Rafael Feijó","Luiz Loncan"];
const SEMANAS = ["13–19 jul","20–26 jul","27 jul–2 ago","3–8 ago"];
const METAS = {
  leadsSemana: 1200,             // meta de leads inbound / semana
  receitaMes: 100000,            // meta de receita da casa / mês
  reunioesSemana: 12,            // meta de reuniões realizadas / semana (time)
  porConsultor: {"Victor Hugo":33000,"Rafael Feijó":33000,"Luiz Loncan":34000}
};
const BENCH = {
  connect:[.05,.10], agendOut:[.15,.25], qual:[.30,.50], agendIn:[.40,.60],
  show:[.70,.80], winOut:[.15,.25], winIn:[.25,.40], speed:5, noshow:.25
};
// [semana, consultor, canal, tipo, topo, meio, agen, real, vendas, receita, speed]
const RAW = [
 // ---- Semana 1
 [0,"Victor Hugo","Frio","out",148,6,2,1,0,0,null],
 [0,"Rafael Feijó","Frio","out",152,7,2,2,0,0,null],
 [0,"Luiz Loncan","Frio","out",120,6,1,1,1,6000,null],
 [0,"Victor Hugo","Google Ads","in",4,2,1,1,0,0,38],
 [0,"Rafael Feijó","Instagram","in",6,3,2,1,0,0,25],
 [0,"Luiz Loncan","Rede dos sócios","in",7,4,2,2,1,6000,12],
 // ---- Semana 2
 [1,"Victor Hugo","Frio","out",155,7,2,1,0,0,null],
 [1,"Rafael Feijó","Frio","out",140,5,1,1,0,0,null],
 [1,"Luiz Loncan","Frio","out",128,6,2,2,1,6000,null],
 [1,"Victor Hugo","Google Ads","in",5,2,1,1,0,0,42],
 [1,"Rafael Feijó","Instagram","in",8,4,2,2,1,6000,22],
 [1,"Luiz Loncan","Rede dos sócios","in",6,3,2,1,0,0,15],
 // ---- Semana 3
 [2,"Victor Hugo","Frio","out",160,8,2,2,0,0,null],
 [2,"Rafael Feijó","Frio","out",150,6,2,1,1,6000,null],
 [2,"Luiz Loncan","Frio","out",132,7,2,2,0,0,null],
 [2,"Victor Hugo","Google Ads","in",6,3,2,1,1,6000,35],
 [2,"Rafael Feijó","Instagram","in",9,4,2,2,0,0,20],
 [2,"Luiz Loncan","Rede dos sócios","in",8,5,3,2,1,6000,10],
 // ---- Semana 4
 [3,"Victor Hugo","Frio","out",162,7,2,2,1,6000,null],
 [3,"Rafael Feijó","Frio","out",158,7,2,2,0,0,null],
 [3,"Luiz Loncan","Frio","out",136,7,2,1,1,6000,null],
 [3,"Victor Hugo","Google Ads","in",7,3,2,2,0,0,30],
 [3,"Rafael Feijó","Instagram","in",10,5,3,2,1,6000,18],
 [3,"Luiz Loncan","Rede dos sócios","in",9,5,3,3,1,6000,9]
];
