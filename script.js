(() => {
  const $ = id => document.getElementById(id);
  const I = (id, n, f, t, m, d, spec) => ({ id, n, f, t, m, d, spec });

  const PI_CAP = { gpio: 'GPIO', wifi: 'Wi-Fi', bt: 'Bluetooth', eth: 'Ethernet', cam: 'Câmera', ai: 'IA na borda',
    hub: 'Hub/servidor', pcie: 'PCIe/NVMe', lowpower: 'Baixo consumo', rt: 'Tempo real', emb: 'Industrial' };
  const G = ['gpio'], FULL = ['gpio', 'eth', 'cam'];
  // id, nome, ano, família, cpu, ram, rede, E/S, tags, tamanho, descrição
  const PI_RAW = [
    ['pi1', 'Raspberry Pi 1 B+', 2014, 'Computador', 'ARM11 single-core 700 MHz', '512 MB', 'Ethernet 10/100', '40 pinos GPIO, 4× USB', [...FULL, 'hub'], 'md', 'A placa que começou tudo. Ainda serve para tarefas leves de automação em rede cabeada.'],
    ['pi2', 'Raspberry Pi 2 B', 2015, 'Computador', 'Quad-core Cortex-A7 900 MHz', '1 GB', 'Ethernet 10/100', '40 pinos GPIO, 4× USB', [...FULL, 'hub'], 'md', 'Primeira com vários núcleos. Boa para gateways simples e servidores leves.'],
    ['pi3b', 'Raspberry Pi 3 B', 2016, 'Computador', 'Quad-core Cortex-A53 1,2 GHz', '1 GB', 'Wi-Fi 2,4 GHz, Bluetooth 4.1, Ethernet', '40 pinos GPIO, 4× USB', [...FULL, 'wifi', 'bt', 'hub'], 'md', 'Primeira com Wi-Fi e Bluetooth embutidos, o que simplificou muito projetos de IoT.'],
    ['pi3bp', 'Raspberry Pi 3 B+', 2018, 'Computador', 'Quad-core Cortex-A53 1,4 GHz', '1 GB', 'Wi-Fi dual-band, Bluetooth 4.2, Gigabit sobre USB 2.0', '40 pinos GPIO, PoE via HAT', [...FULL, 'wifi', 'bt', 'hub'], 'md', 'Wi-Fi mais estável e suporte a alimentação por cabo de rede (PoE) com um HAT.'],
    ['pi3ap', 'Raspberry Pi 3 A+', 2018, 'Computador', 'Quad-core Cortex-A53 1,4 GHz', '512 MB', 'Wi-Fi dual-band, Bluetooth 4.2', '40 pinos GPIO, 1× USB', [...G, 'cam', 'wifi', 'bt'], 'sm', 'Formato menor e sem Ethernet, pensada para projetos compactos sem fio.'],
    ['pi4', 'Raspberry Pi 4 B', 2019, 'Computador', 'Quad-core Cortex-A72 1,5 GHz', '1 a 8 GB', 'Wi-Fi dual-band, Bluetooth 5.0, Gigabit Ethernet', '40 pinos GPIO, USB 3.0, 2× micro-HDMI', [...FULL, 'wifi', 'bt', 'hub', 'ai'], 'lg', 'Potente o bastante para hub de casa inteligente, visão computacional e modelos de IA leves.'],
    ['pi5', 'Raspberry Pi 5', 2023, 'Computador', 'Quad-core Cortex-A76 2,4 GHz', '2 a 16 GB', 'Wi-Fi dual-band, Bluetooth 5.0, Gigabit Ethernet', '40 pinos GPIO, PCIe 2.0, RTC, 2× câmera/display', [...FULL, 'wifi', 'bt', 'hub', 'ai', 'pcie'], 'lg', 'A mais rápida da linha de computadores. Com PCIe aceita SSD NVMe e aceleradores de IA.'],
    ['zero', 'Raspberry Pi Zero', 2015, 'Zero', 'ARM11 single-core 1 GHz', '512 MB', 'Sem rede embutida', '40 pinos GPIO (sem soldar), mini-HDMI', [...G, 'cam', 'lowpower'], 'sm', 'Minúscula e barata. Precisa de adaptador para conectar à rede.'],
    ['zerow', 'Raspberry Pi Zero W', 2017, 'Zero', 'ARM11 single-core 1 GHz', '512 MB', 'Wi-Fi 2,4 GHz, Bluetooth 4.1', '40 pinos GPIO, mini-HDMI', [...G, 'cam', 'wifi', 'bt', 'lowpower'], 'sm', 'A Zero com Wi-Fi e Bluetooth, ideal para sensores e câmeras discretas.'],
    ['zero2w', 'Raspberry Pi Zero 2 W', 2021, 'Zero', 'Quad-core Cortex-A53 1 GHz', '512 MB', 'Wi-Fi 2,4 GHz, Bluetooth 4.2', '40 pinos GPIO, mini-HDMI', [...G, 'cam', 'wifi', 'bt', 'lowpower'], 'sm', 'Mesmo tamanho da Zero W, com bem mais poder de processamento.'],
    ['pico', 'Raspberry Pi Pico', 2021, 'Pico', 'RP2040 dual-core Cortex-M0+ 133 MHz', '264 KB SRAM, 2 MB flash', 'Sem rede embutida', 'GPIO, ADC, I²C, SPI, UART, PIO', [...G, 'lowpower', 'rt'], 'pico', 'Microcontrolador para leitura de sensores e controle em tempo real, programável em MicroPython ou C.'],
    ['picow', 'Raspberry Pi Pico W', 2022, 'Pico', 'RP2040 dual-core Cortex-M0+ 133 MHz', '264 KB SRAM, 2 MB flash', 'Wi-Fi 2,4 GHz, Bluetooth', 'GPIO, ADC, I²C, SPI, UART, PIO', [...G, 'wifi', 'bt', 'lowpower', 'rt'], 'pico', 'Pico com rede sem fio: sensores que publicam dados direto na nuvem ou em um broker MQTT.'],
    ['pico2', 'Raspberry Pi Pico 2', 2024, 'Pico', 'RP2350 dual-core Cortex-M33 ou RISC-V 150 MHz', '520 KB SRAM, 4 MB flash', 'Sem rede embutida', 'GPIO, ADC, I²C, SPI, UART, PIO', [...G, 'lowpower', 'rt'], 'pico', 'Sucessora da Pico, com mais memória, mais desempenho e recursos de segurança.'],
    ['pico2w', 'Raspberry Pi Pico 2 W', 2024, 'Pico', 'RP2350 dual-core Cortex-M33 ou RISC-V 150 MHz', '520 KB SRAM, 4 MB flash', 'Wi-Fi 2,4 GHz, Bluetooth', 'GPIO, ADC, I²C, SPI, UART, PIO', [...G, 'wifi', 'bt', 'lowpower', 'rt'], 'pico', 'A Pico 2 com Wi-Fi e Bluetooth, para IoT sem fio de baixo consumo.'],
    ['cm4', 'Compute Module 4', 2020, 'Compute Module', 'Quad-core Cortex-A72 1,5 GHz', '1 a 8 GB, eMMC opcional', 'Gigabit Ethernet, Wi-Fi e Bluetooth opcionais', 'PCIe 2.0, USB 2.0, câmera/display via conectores', [...FULL, 'hub', 'ai', 'pcie', 'emb'], 'md', 'O núcleo do Pi 4 em formato de módulo, para integrar em produtos e equipamentos industriais.'],
    ['cm5', 'Compute Module 5', 2024, 'Compute Module', 'Quad-core Cortex-A76 2,4 GHz', '2 a 16 GB, eMMC opcional', 'Gigabit Ethernet, Wi-Fi e Bluetooth opcionais', 'PCIe 2.0, USB 3.0, câmera/display via conectores', [...FULL, 'hub', 'ai', 'pcie', 'emb'], 'md', 'O módulo baseado no Pi 5, para produtos que precisam de mais desempenho.'],
    ['pi400', 'Raspberry Pi 400', 2020, 'Teclado', 'Quad-core Cortex-A72 1,8 GHz', '4 GB', 'Wi-Fi dual-band, Bluetooth 5.0, Gigabit Ethernet', '40 pinos GPIO, USB 3.0, 2× micro-HDMI', [...FULL, 'wifi', 'bt', 'hub'], 'lg', 'Computador dentro do teclado. Ótimo para aprender e prototipar, com GPIO acessível na parte de trás.'],
    ['pi500', 'Raspberry Pi 500', 2024, 'Teclado', 'Quad-core Cortex-A76 2,4 GHz', '8 GB', 'Wi-Fi dual-band, Bluetooth 5.0, Gigabit Ethernet', '40 pinos GPIO, USB 3.0, 2× micro-HDMI', [...FULL, 'wifi', 'bt', 'hub', 'ai'], 'lg', 'O Pi 5 dentro de um teclado, para estudo, desenvolvimento e uso como estação de trabalho.']
  ];
  const FN_PI = [
    ['Sensores e atuadores', 'Lê sensores e aciona relés, motores e LEDs pelos pinos GPIO, I²C, SPI e UART.', 'gpio'],
    ['Conexão sem fio', 'Envia dados por Wi-Fi ou Bluetooth, por exemplo via MQTT, HTTP ou BLE.', 'wifi'],
    ['Cabo de rede', 'Liga em rede cabeada para dispositivos fixos, com mais estabilidade.', 'eth'],
    ['Hub de casa inteligente', 'Roda Home Assistant, Node-RED e brokers MQTT para coordenar outros dispositivos.', 'hub'],
    ['Câmera e visão computacional', 'Captura imagens e vídeo para monitoramento, leitura de placas ou contagem de objetos.', 'cam'],
    ['IA na borda', 'Executa modelos de IA no próprio equipamento, sem depender da nuvem. Aceleradores externos ampliam o desempenho.', 'ai'],
    ['Baixo consumo', 'Funciona com pouca energia, bom para baterias e sensores remotos.', 'lowpower'],
    ['Controle em tempo real', 'Tempo de resposta previsível para PWM, motores e protocolos com temporização exata.', 'rt'],
    ['Armazenamento rápido', 'Usa SSD NVMe via PCIe para NAS, gravação de dados e servidores locais.', 'pcie'],
    ['Industrial e embarcado', 'Módulo para integrar em placa própria de produto, quadro ou equipamento.', 'emb']
  ];
  const PI = PI_RAW.map(a => I(a[0], a[1], a[3], a[8], [a[4], 'Memória: ' + a[5]], a[10],
    [['Ano', a[2]], ['Processador', a[4]], ['Memória', a[5]], ['Rede', a[6]], ['Entradas e saídas', a[7]]]));
  const PIC = { Computador: '#2f8a45', Zero: '#3a9a55', Pico: '#1f8f5a', 'Compute Module': '#26303f', Teclado: '#8a8576' };
  const ESP_CAP = { wifi4: 'Wi-Fi 4', wifi6: 'Wi-Fi 6', wifi5: 'Wi-Fi 5 GHz', ble: 'Bluetooth LE', btc: 'Bluetooth Clássico',
    th: 'Thread/Zigbee', ai: 'IA na borda', cam: 'Câmera/display', usb: 'USB nativo', lp: 'Baixo consumo' };
  const TOF_CAP = { long: 'Longo alcance', multi: 'Multizona', roi: 'ROI configurável', mo: 'Multiobjeto', amb: 'Luz ambiente', fov: 'Campo amplo' };

  const ESP = [
    I('esp8266', 'ESP8266', 'Legado', ['wifi4'], ['Tensilica L106, 80 MHz', 'Wi-Fi 4'],
      'O chip que popularizou o IoT barato com Wi-Fi, presente em módulos como ESP-01 e NodeMCU.',
      [['Processador', 'Tensilica L106 single-core, 80 MHz'], ['Wi-Fi', 'Wi-Fi 4 (2,4 GHz)'], ['Bluetooth', 'Não tem'], ['Pinos', 'Poucos GPIO e 1 ADC']]),
    I('esp32', 'ESP32', 'Xtensa', ['wifi4', 'ble', 'btc'], ['Xtensa LX6 dual-core, 240 MHz', 'Wi-Fi 4 + Bluetooth'],
      'O modelo original e o mais difundido. Equilibra desempenho, rede sem fio e muitos periféricos.',
      [['Processador', 'Xtensa LX6 dual-core, até 240 MHz'], ['Wi-Fi', 'Wi-Fi 4 (2,4 GHz)'], ['Bluetooth', 'Clássico e LE'], ['Memória', '520 KB de SRAM'], ['Pinos', 'GPIO, ADC, DAC e sensores de toque']]),
    I('esp32s2', 'ESP32-S2', 'Xtensa', ['wifi4', 'usb', 'cam'], ['Xtensa LX7 single-core, 240 MHz', 'Wi-Fi 4 + USB'],
      'Foco em Wi-Fi e USB nativo, sem Bluetooth. Boa para dispositivos USB e projetos só com Wi-Fi.',
      [['Processador', 'Xtensa LX7 single-core, até 240 MHz'], ['Wi-Fi', 'Wi-Fi 4 (2,4 GHz)'], ['Bluetooth', 'Não tem'], ['Memória', '320 KB de SRAM'], ['USB', 'USB OTG nativo']]),
    I('esp32s3', 'ESP32-S3', 'Xtensa', ['wifi4', 'ble', 'usb', 'ai', 'cam'], ['Xtensa LX7 dual-core, 240 MHz', 'Wi-Fi 4 + BLE 5'],
      'A mais indicada para IA e imagem na borda: instruções de vetor para redes neurais e interface de câmera e display.',
      [['Processador', 'Xtensa LX7 dual-core, até 240 MHz'], ['Wi-Fi', 'Wi-Fi 4 (2,4 GHz)'], ['Bluetooth', 'LE 5'], ['Memória', '512 KB de SRAM'], ['Extras', 'USB OTG, instruções de vetor para IA, interface de câmera/LCD']]),
    I('esp32c2', 'ESP32-C2', 'RISC-V', ['wifi4', 'ble', 'lp'], ['RISC-V, 120 MHz', 'Wi-Fi 4 + BLE 5'],
      'Versão de custo reduzido para dispositivos simples conectados.',
      [['Processador', 'RISC-V single-core, 120 MHz'], ['Wi-Fi', 'Wi-Fi 4 (2,4 GHz)'], ['Bluetooth', 'LE 5'], ['Memória', 'Menor que a do ESP32-C3']]),
    I('esp32c3', 'ESP32-C3', 'RISC-V', ['wifi4', 'ble', 'lp'], ['RISC-V, 160 MHz', 'Wi-Fi 4 + BLE 5'],
      'Alternativa RISC-V econômica ao ESP32, com Wi-Fi e Bluetooth LE para sensores e automação.',
      [['Processador', 'RISC-V single-core, até 160 MHz'], ['Wi-Fi', 'Wi-Fi 4 (2,4 GHz)'], ['Bluetooth', 'LE 5'], ['Memória', '400 KB de SRAM']]),
    I('esp32c5', 'ESP32-C5', 'RISC-V', ['wifi6', 'wifi5', 'ble', 'th', 'lp'], ['RISC-V, 240 MHz', 'Wi-Fi 6 dual-band + BLE 5'],
      'Traz Wi-Fi 6 nas bandas de 2,4 e 5 GHz, mais 802.15.4 para Thread e Zigbee.',
      [['Processador', 'RISC-V single-core, até 240 MHz'], ['Wi-Fi', 'Wi-Fi 6 (2,4 e 5 GHz)'], ['Bluetooth', 'LE 5'], ['802.15.4', 'Thread e Zigbee']]),
    I('esp32c6', 'ESP32-C6', 'RISC-V', ['wifi6', 'ble', 'th', 'lp'], ['RISC-V, 160 MHz', 'Wi-Fi 6 + BLE 5 + 802.15.4'],
      'Chip pensado para casa inteligente moderna: Wi-Fi 6, BLE e rádio 802.15.4 para Thread e Zigbee.',
      [['Processador', 'RISC-V single-core, até 160 MHz, mais núcleo de baixo consumo'], ['Wi-Fi', 'Wi-Fi 6 (2,4 GHz)'], ['Bluetooth', 'LE 5'], ['802.15.4', 'Thread e Zigbee'], ['Memória', '512 KB de SRAM']]),
    I('esp32h2', 'ESP32-H2', 'RISC-V', ['ble', 'th', 'lp'], ['RISC-V, 96 MHz', 'BLE 5 + 802.15.4'],
      'Sem Wi-Fi. Fala Bluetooth LE, Thread e Zigbee, para sensores e dispositivos de malha com baixo consumo.',
      [['Processador', 'RISC-V single-core, 96 MHz'], ['Wi-Fi', 'Não tem'], ['Bluetooth', 'LE 5'], ['802.15.4', 'Thread e Zigbee']]),
    I('esp32p4', 'ESP32-P4', 'RISC-V', ['ai', 'cam', 'usb'], ['RISC-V dual-core, 400 MHz', 'Sem rádio embutido'],
      'Voltado a desempenho: imagem, vídeo e interfaces gráficas. Não traz Wi-Fi nem Bluetooth, que vêm de um chip ao lado.',
      [['Processador', 'RISC-V dual-core até 400 MHz, mais núcleo de baixo consumo'], ['Wi-Fi/Bluetooth', 'Não embutidos'], ['Extras', 'Câmera MIPI-CSI, display MIPI-DSI, USB 2.0 High-Speed, aceleração de IA']])
  ];

  const TOF = [
    I('vl6180x', 'VL6180X', 'Proximidade', ['amb'], ['Até ~10 cm', 'I²C'],
      'Sensor de curtíssimo alcance que também mede luz ambiente. Bom para gestos e presença muito próxima.',
      [['Alcance', 'até cerca de 10 cm'], ['Zonas', '1'], ['Interface', 'I²C'], ['Extra', 'Sensor de luz ambiente']]),
    I('vl53l0x', 'VL53L0X', 'Zona única', [], ['Até ~2 m', '1 zona · I²C'],
      'Sensor ToF a laser clássico e barato, ótimo para robótica e medição de distância simples.',
      [['Alcance', 'até cerca de 2 m'], ['Zonas', '1'], ['Interface', 'I²C'], ['Taxa', 'até cerca de 50 Hz']]),
    I('vl53l1x', 'VL53L1X', 'Zona única', ['long', 'roi'], ['Até ~4 m', '1 zona + ROI · I²C'],
      'Alcance maior e área de leitura (ROI) programável, que permite apontar para uma região do campo de visão.',
      [['Alcance', 'até cerca de 4 m'], ['Zonas', '1, com ROI programável'], ['Campo de visão', 'cerca de 27°'], ['Interface', 'I²C'], ['Taxa', 'até cerca de 50 Hz']]),
    I('vl53l3cx', 'VL53L3CX', 'Zona única', ['long', 'mo'], ['Até ~3 m', 'Multiobjeto · I²C'],
      'Consegue distinguir mais de um objeto na mesma linha de visão, útil quando há vidro ou obstáculos parciais.',
      [['Alcance', 'até cerca de 3 m'], ['Zonas', '1'], ['Diferencial', 'Detecção de múltiplos objetos'], ['Interface', 'I²C']]),
    I('vl53l4cd', 'VL53L4CD', 'Zona única', [], ['1 mm a 1,3 m', '1 zona · I²C'],
      'Foco em precisão a curta distância, com medições a partir de 1 mm.',
      [['Alcance', 'de 1 mm a cerca de 1,3 m'], ['Zonas', '1'], ['Interface', 'I²C']]),
    I('vl53l5cx', 'VL53L5CX', 'Multizona', ['long', 'multi', 'fov'], ['Até ~4 m', '8×8 zonas · I²C'],
      'Mede até 64 zonas ao mesmo tempo, formando um mapa de profundidade de baixa resolução.',
      [['Alcance', 'até cerca de 4 m'], ['Zonas', 'até 8×8 (64)'], ['Campo de visão', 'cerca de 61° na diagonal'], ['Interface', 'I²C'], ['Taxa', 'até cerca de 60 Hz (menos zonas)']]),
    I('vl53l7cx', 'VL53L7CX', 'Multizona', ['long', 'multi', 'fov'], ['Até ~3,5 m', '8×8 zonas · I²C'],
      'Multizona com campo de visão muito amplo, bom para cobrir cômodos e detectar pessoas.',
      [['Alcance', 'até cerca de 3,5 m'], ['Zonas', 'até 8×8 (64)'], ['Campo de visão', 'cerca de 90° na diagonal'], ['Interface', 'I²C']])
  ];

  const FN = [
    ['Wi-Fi e MQTT', 'Publica leituras de sensores em um broker MQTT ou em APIs HTTP.', 'wifi4'],
    ['Wi-Fi 6 e 5 GHz', 'Rede mais eficiente e banda de 5 GHz em dispositivos modernos.', 'wifi5'],
    ['Bluetooth LE', 'Configuração pelo celular, beacons e sensores sem fio de baixo consumo.', 'ble'],
    ['Thread e Zigbee', 'Rede em malha para casa inteligente, compatível com ecossistemas como Matter.', 'th'],
    ['Baixo consumo', 'Modos de economia de energia para rodar a bateria.', 'lp'],
    ['IA na borda', 'Reconhecimento de voz e imagem direto no dispositivo.', 'ai'],
    ['Câmera e display', 'Captura imagens e controla telas para interfaces e monitoramento.', 'cam'],
    ['USB nativo', 'Age como teclado, armazenamento ou outros dispositivos USB.', 'usb']
  ];
  const USE = [
    ['Nível de reservatório', 'Mede a distância até a superfície da água ou de grãos em tanques e silos.', ['vl53l1x', 'vl53l4cd']],
    ['Evitar obstáculos', 'Robôs e carrinhos detectam paredes e objetos à frente.', ['vl53l0x', 'vl53l1x']],
    ['Contagem de pessoas', 'Conta quem passa por uma porta ou corredor.', ['vl53l5cx', 'vl53l7cx']],
    ['Presença e gestos', 'Acende luz ou ativa torneira sem tocar, a poucos centímetros.', ['vl6180x', 'vl53l4cd']],
    ['Vaga de estacionamento', 'Indica se há veículo parado abaixo do sensor.', ['vl53l1x', 'vl53l3cx']],
    ['Mapa de profundidade simples', 'Forma uma imagem grosseira da cena, sem câmera.', ['vl53l5cx', 'vl53l7cx']]
  ];

  const ALL = [...PI, ...ESP, ...TOF];

  function art(it, big) {
    const kind = PI.includes(it) ? 'pi' : ESP.includes(it) ? 'esp' : 'tof', w = 170, h = kind === 'tof' ? 70 : 90;
    const col = kind === 'pi' ? PIC[it.f] : kind === 'esp' ? '#1b3b3a' : '#14304f';
    const dots = Array.from({ length: 14 }, (_, i) => `<circle cx="${10 + i * 11.5}" cy="6" r="2" fill="#e8c76a"/>`).join('');
    const body = {
      pi: '<rect x="14" y="28" width="34" height="40" rx="2" fill="#cfd3da"/><rect x="66" y="34" width="34" height="26" rx="3" fill="#0a0f16" opacity=".55"/><rect x="116" y="28" width="38" height="40" rx="2" fill="#fff" opacity=".35"/>',
      esp: '<rect x="22" y="22" width="60" height="46" rx="3" fill="#cfd3da"/><path d="M96 26h8v10h8v10h8v10h8v10h8" fill="none" stroke="#22d3b6" stroke-width="3"/>',
      tof: '<rect x="26" y="22" width="36" height="30" rx="3" fill="#0a0f16" stroke="#ff8a3d" stroke-width="2"/><rect x="82" y="22" width="36" height="30" rx="3" fill="#0a0f16" stroke="#22d3b6" stroke-width="2"/>'
    }[kind];
    return `<svg viewBox="0 0 ${w} ${h}" width="${big ? 240 : w}" role="img" aria-label="Ilustração de ${it.n}">
      <rect width="${w}" height="${h}" rx="8" fill="${col}"/>${dots}${body}</svg>`;
  }

  function section(key, data, capMap, fams) {
    const state = { fam: '', cap: '', q: '', cmp: [] };
    const grid = $(key + '-grid');

    function chips(box, items, prop) {
      box.innerHTML = '';
      items.forEach(([v, label]) => {
        const b = document.createElement('button');
        b.className = 'chip'; b.textContent = label; b.setAttribute('aria-pressed', state[prop] === v);
        b.onclick = () => { state[prop] = state[prop] === v ? '' : v; chips(box, items, prop); render(); };
        box.appendChild(b);
      });
    }

    function render() {
      const q = state.q.trim().toLowerCase();
      const list = data.filter(it => (!state.fam || it.f === state.fam) && (!state.cap || it.t.includes(state.cap)) && (!q || it.n.toLowerCase().includes(q)));
      grid.innerHTML = '';
      list.forEach(it => {
        const c = document.createElement('article'); c.className = 'card'; c.tabIndex = 0;
        c.innerHTML = `<div class="art">${art(it)}</div><h3>${it.n}</h3><div class="meta">${it.f}</div>
          ${it.m.map(x => `<div class="meta">${x}</div>`).join('')}
          <div class="chips">${it.t.slice(0, 5).map(t => `<span class="tag">${capMap[t]}</span>`).join('')}</div>
          <label><input type="checkbox" ${state.cmp.includes(it.id) ? 'checked' : ''}> Comparar</label>`;
        const cb = c.querySelector('input');
        c.querySelector('label').onclick = e => e.stopPropagation();
        cb.onchange = () => toggle(it.id, cb);
        c.onclick = () => openModal(it.id);
        c.onkeydown = e => { if (e.key === 'Enter') openModal(it.id); };
        grid.appendChild(c);
      });
      $(key + '-empty').hidden = list.length > 0;
    }

    function toggle(id, cb) {
      if (state.cmp.includes(id)) state.cmp = state.cmp.filter(x => x !== id);
      else if (state.cmp.length < 3) state.cmp.push(id);
      else { cb.checked = false; $(key + '-hint').textContent = 'Você já escolheu 3. Desmarque uma para trocar.'; return; }
      renderCmp();
    }

    function renderCmp() {
      const items = state.cmp.map(id => data.find(x => x.id === id));
      $(key + '-hint').textContent = items.length ? '' : 'Marque até 3 itens nos cards para compará-los aqui.';
      if (!items.length) { $(key + '-cmp').innerHTML = ''; return; }
      const labels = [...new Set(items.flatMap(it => it.spec.map(s => s[0])))];
      $(key + '-cmp').innerHTML = `<tr><th></th>${items.map(it => `<td class="h">${it.n}</td>`).join('')}</tr>` +
        labels.map(l => `<tr><th>${l}</th>${items.map(it => `<td>${(it.spec.find(s => s[0] === l) || [0, '—'])[1]}</td>`).join('')}</tr>`).join('');
    }

    $(key + '-search').addEventListener('input', e => { state.q = e.target.value; render(); });
    chips($(key + '-fams'), fams.map(f => [f, f]), 'fam');
    chips($(key + '-caps'), Object.entries(capMap), 'cap');
    render(); renderCmp();
  }

  function openModal(id) {
    const it = ALL.find(x => x.id === id), m = $('modal'), caps = PI.includes(it) ? PI_CAP : ESP.includes(it) ? ESP_CAP : TOF_CAP;
    m.innerHTML = `<div class="mhead">${art(it, true)}</div><div class="mbody"><h2>${it.n}</h2><p>${it.d}</p>
      <div class="spec">${it.spec.map(s => `<b>${s[0]}</b><span>${s[1]}</span>`).join('')}</div>
      <div class="chips">${it.t.map(t => `<span class="tag">${caps[t]}</span>`).join('')}</div>
      <button class="close">Fechar</button></div>`;
    m.querySelector('.close').onclick = () => m.close();
    m.showModal();
  }
  $('modal').addEventListener('click', e => { if (e.target === $('modal')) $('modal').close(); });

  section('pi', PI, PI_CAP, ['Computador', 'Zero', 'Pico', 'Compute Module', 'Teclado']);
  section('esp', ESP, ESP_CAP, ['Xtensa', 'RISC-V', 'Legado']);
  section('tof', TOF, TOF_CAP, ['Proximidade', 'Zona única', 'Multizona']);

  const chipsFor = ids => ids.map(id => `<button class="chip" data-id="${id}">${ALL.find(x => x.id === id).n}</button>`).join('');
  $('fn').innerHTML = FN.map(f => `<div class="fn"><h3>${f[0]}</h3><p>${f[1]}</p><div class="chips">${chipsFor(ESP.filter(e => e.t.includes(f[2])).map(e => e.id))}</div></div>`).join('');
  $('fnpi').innerHTML = FN_PI.map(f => `<div class="fn"><h3>${f[0]}</h3><p>${f[1]}</p><div class="chips">${chipsFor(PI.filter(p => p.t.includes(f[2])).map(p => p.id))}</div></div>`).join('');
  $('use').innerHTML = USE.map(u => `<div class="fn"><h3>${u[0]}</h3><p>${u[1]}</p><div class="chips">${chipsFor(u[2])}</div></div>`).join('');
  document.querySelectorAll('#iot .chip').forEach(c => c.onclick = () => openModal(c.dataset.id));
})();
