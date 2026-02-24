import React, { useState, useEffect, useRef } from "react";
import {
  Calculator,
  Settings,
  PieChart,
  Info,
  ChevronRight,
  Home,
  Layers,
  Building,
  Car,
  Map,
  Facebook,
  ChevronDown,
  ChevronUp,
  Share2,
  Phone,
  X,
  Sparkles,
  HelpCircle,
  ArrowRightLeft,
  Eye,
} from "lucide-react";

// --- 自定義圖示元件 ---
const LineIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.992 2.612-4.023 2.612-6.092z" />
  </svg>
);

// --- 啟動頁面元件 ---
const SplashScreen = ({ onFinish }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFading(true), 2000); // 2秒後開始淡出
    const timer2 = setTimeout(onFinish, 2500); // 2.5秒後完全移除

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-4 animate-fade-in-up">
        <div className="w-20 h-20 bg-emerald-900/50 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <Building className="w-10 h-10 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wider mb-1">
            橙澤國際
          </h1>
          <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
            Chengze International
          </p>
        </div>
        <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto my-4"></div>
        <p className="text-slate-400 text-sm font-light">您的房產智慧顧問</p>
      </div>

      <div className="absolute bottom-10 text-slate-600 text-xs">
        Loading...
      </div>
    </div>
  );
};

// --- UI 元件封裝 ---
const Card = ({
  children,
  className = "",
  title,
  icon: Icon,
  colorClass = "text-slate-700",
  bgIconClass = "bg-slate-100",
  action,
}) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}
  >
    {(title || Icon) && (
      <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-2 rounded-xl ${bgIconClass}`}>
              <Icon className={`w-5 h-5 ${colorClass}`} />
            </div>
          )}
          <span className="font-bold text-slate-800 text-base">{title}</span>
        </div>
        {action}
      </div>
    )}
    <div className="p-5">{children}</div>
  </div>
);

const InputGroup = ({
  label,
  value,
  onChange,
  unit,
  step = 1,
  min,
  max,
  type = "number",
  helpText,
  tooltip,
  highlight,
}) => {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1.5">
          <label
            className={`text-sm font-medium ${
              highlight ? "text-amber-600" : "text-slate-600"
            }`}
          >
            {label}
          </label>
          {tooltip && (
            <button
              onClick={() => setShowTip(!showTip)}
              className={`transition-colors focus:outline-none ${
                showTip
                  ? "text-emerald-500"
                  : "text-slate-400 hover:text-emerald-500"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {type === "range" && (
          <span
            className={`${
              highlight ? "text-amber-600" : "text-emerald-600"
            } font-bold font-mono`}
          >
            {value} {unit}
          </span>
        )}
      </div>

      {/* Tooltip Content */}
      {showTip && (
        <div className="mb-3 p-3 bg-slate-800 text-slate-200 text-xs rounded-xl relative animate-fade-in shadow-lg leading-relaxed z-10">
          <div className="absolute -top-1.5 left-6 w-3 h-3 bg-slate-800 rotate-45"></div>
          {tooltip}
        </div>
      )}

      {type === "range" ? (
        <div className="relative h-6 flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer transition-all ${
              highlight
                ? "accent-amber-500 hover:accent-amber-400"
                : "accent-emerald-500 hover:accent-emerald-400"
            }`}
          />
        </div>
      ) : (
        <div className="relative">
          <input
            type="number"
            value={value}
            onChange={onChange}
            step={step}
            className={`w-full bg-slate-50 hover:bg-white focus:bg-white transition-colors p-3 pr-10 rounded-xl border focus:ring-4 outline-none text-right font-bold text-slate-800 font-mono text-lg ${
              highlight
                ? "border-amber-200 focus:border-amber-500 focus:ring-amber-500/10"
                : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10"
            }`}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">
              {unit}
            </span>
          )}
        </div>
      )}
      {helpText && (
        <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default function App() {
  // 頁面狀態：'splash' | 'app'
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState("input");

  // 新增：用於控制內容區塊捲軸的 Ref
  const scrollContainerRef = useRef(null);

  // 計算模式：'forward' (房價推算) | 'reverse' (地價回推)
  const [calculationMode, setCalculationMode] = useState("forward");

  // --- 參數狀態 (預設值改為南部標準) ---
  const [landPrice, setLandPrice] = useState(500000);
  const [targetSellingPrice, setTargetSellingPrice] = useState(350000); // 逆向模式：周邊行情目標

  const [landArea, setLandArea] = useState(800);
  const [far, setFar] = useState(240);
  const [bcr, setBcr] = useState(50);
  const [bonusRate, setBonusRate] = useState(30);
  const [transferRate, setTransferRate] = useState(0);
  const [transferCostPerPing, setTransferCostPerPing] = useState(0);

  // --- 免計容積 (Efficiency) 狀態 ---
  const [efficiencyMode, setEfficiencyMode] = useState("detail");
  const [efficiencyRate, setEfficiencyRate] = useState(1.25);

  // 詳細模式參數
  const [effStair, setEffStair] = useState(5.0);
  const [effBalcony, setEffBalcony] = useState(10.0);

  // 屋突參數
  const [effRoofLayers, setEffRoofLayers] = useState(2);
  const [effRoofLimit, setEffRoofLimit] = useState(12.5);

  // 地下室參數
  const [effBaseLayers, setEffBaseLayers] = useState(2);
  const [effBaseExcavation, setEffBaseExcavation] = useState(90);
  const [effBaseAlloc, setEffBaseAlloc] = useState(25);

  const [constructionCost, setConstructionCost] = useState(180000);
  const [overheadRate, setOverheadRate] = useState(15);
  const [profitRate, setProfitRate] = useState(20);

  // --- 車位參數 ---
  const [includeParking, setIncludeParking] = useState(true);
  const [parkingPrice, setParkingPrice] = useState(1800000);
  const [parkingRefArea, setParkingRefArea] = useState(35);

  // --- 護眼模式 (字體與介面放大) ---
  const [zoomLevel, setZoomLevel] = useState(1);

  // --- 計算結果 ---
  const [result, setResult] = useState({
    sellingPrice: 0, // 房價 (可能是計算出 or 輸入的目標)
    totalCost: 0,
    landCostPerPing: 0, // 建築坪分攤的土地成本
    derivedLandPrice: 0, // 逆向計算出的土地單價
    constructionCost: 0,
    marketingExp: 0,
    profit: 0,
    effectiveMultiplier: 0,
    totalSalesPing: 0,
    totalProjectAmount: 0,
    totalHousingSales: 0,
    totalParkingSales: 0,
    totalParkingCount: 0,
  });

  // --- 護眼放大邏輯 ---
  useEffect(() => {
    // 透過修改根元素的 font-size，讓全部採用 rem 響應式單位的 Tailwind 元素等比例放大
    document.documentElement.style.fontSize = `${16 * zoomLevel}px`;

    // 清除 effect 確保不影響預設值
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [zoomLevel]);

  // --- 切換分頁時自動回到置頂 ---
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  // --- 計算邏輯 ---
  useEffect(() => {
    // 1. 計算銷坪係數 (Multiplier)
    let finalSaleableAreaRatio = 0;
    let calculatedMultiplier = 0;

    if (efficiencyMode === "simple") {
      const volumeMultiplier = 1 + (bonusRate + transferRate) / 100;
      calculatedMultiplier = volumeMultiplier * efficiencyRate;
      finalSaleableAreaRatio = (far / 100) * calculatedMultiplier;
    } else {
      const baseVolumeRatio =
        (far / 100) * (1 + (bonusRate + transferRate) / 100);
      const volExemptionRatio =
        baseVolumeRatio * ((effStair + effBalcony) / 100);
      const basementRatio =
        (effBaseLayers * effBaseExcavation * (effBaseAlloc / 100)) / 100;
      const roofRatio = (bcr / 100) * (effRoofLimit / 100) * effRoofLayers;
      finalSaleableAreaRatio =
        baseVolumeRatio + volExemptionRatio + basementRatio + roofRatio;
      calculatedMultiplier = finalSaleableAreaRatio / (far / 100);
    }

    const totalSalesPing = landArea * finalSaleableAreaRatio;

    // 車位總銷計算 (不論模式都一樣)
    let totalParkingCount = 0;
    let calcParkingSales = 0;
    if (includeParking) {
      const refArea = parkingRefArea > 0 ? parkingRefArea : 35;
      totalParkingCount = totalSalesPing / refArea;
      calcParkingSales = totalParkingCount * parkingPrice;
    }

    // 容積移轉成本 (每地坪)
    const transferVolumePerLandPing = 1 * (far / 100) * (transferRate / 100);
    const totalTransferCostPerLandPing =
      transferVolumePerLandPing * transferCostPerPing;

    // --- 分流計算 ---
    let finalSellingPrice = 0;
    let finalLandPrice = 0;
    let finalLandCostPerPing = 0; // 每銷坪分攤之土地成本(不含容移)
    let finalBaseCost = 0;
    let finalMarketingExp = 0;
    let finalTotalCost = 0;
    let finalProfit = 0;

    if (calculationMode === "forward") {
      // === 正向：地價推房價 ===
      finalLandPrice = landPrice;
      const totalLandSideCost = landPrice + totalTransferCostPerLandPing;

      // 每銷坪土地成本
      finalLandCostPerPing = totalLandSideCost / finalSaleableAreaRatio; // 這裡其實包含了容移成本，為了顯示方便我們稍後拆開顯示

      finalBaseCost = finalLandCostPerPing + constructionCost;
      finalMarketingExp = finalBaseCost * (overheadRate / 100);
      finalTotalCost = finalBaseCost + finalMarketingExp;
      finalProfit = finalTotalCost * (profitRate / 100);
      finalSellingPrice = finalTotalCost + finalProfit;
    } else {
      // === 逆向：房價推地價 ===
      finalSellingPrice = targetSellingPrice;

      // 回推步驟：
      // 售價 = 總成本 * (1 + 利潤率)
      // 總成本 = 售價 / (1 + 利潤率)
      finalTotalCost = finalSellingPrice / (1 + profitRate / 100);
      finalProfit = finalSellingPrice - finalTotalCost;

      // 總成本 = 基礎成本 * (1 + 管銷率)
      // 基礎成本 = 總成本 / (1 + 管銷率)
      finalBaseCost = finalTotalCost / (1 + overheadRate / 100);
      finalMarketingExp = finalTotalCost - finalBaseCost;

      // 基礎成本 = (每銷坪土地成本 + 容移成本分攤) + 營造單價
      // 每銷坪土地成本(含容移) = 基礎成本 - 營造單價
      const landCostBudgetPerPing = finalBaseCost - constructionCost;

      // 如果每坪土地預算小於0，代表營造就虧了
      if (landCostBudgetPerPing < 0) {
        finalLandPrice = 0;
      } else {
        // 回推每地坪總預算 (Total Land Budget per Land Ping) = landCostBudgetPerPing * 銷坪係數
        // 總預算包含：買地錢 + 買容積錢
        const totalLandBudgetPerLandPing =
          landCostBudgetPerPing * finalSaleableAreaRatio;

        // 購地單價 = 總預算 - 容移成本
        finalLandPrice =
          totalLandBudgetPerLandPing - totalTransferCostPerLandPing;
      }

      // 為了圓餅圖顯示一致，重新計算 landCostPerPing (For display)
      finalLandCostPerPing =
        (finalLandPrice + totalTransferCostPerLandPing) /
        finalSaleableAreaRatio;
    }

    const calcHousingSales = finalSellingPrice * totalSalesPing;
    const totalProjectAmount = calcHousingSales + calcParkingSales;

    setResult({
      sellingPrice: Math.round(finalSellingPrice),
      landPrice: landPrice, // Input state
      derivedLandPrice: Math.round(finalLandPrice), // Calculated result
      totalCost: Math.round(finalTotalCost),
      landCostPerPing: Math.round(finalLandCostPerPing),
      constructionCost: Math.round(constructionCost),
      marketingExp: Math.round(finalMarketingExp),
      profit: Math.round(finalProfit),
      effectiveMultiplier: Math.round(calculatedMultiplier * 100) / 100,
      totalSalesPing: Math.round(totalSalesPing),
      totalProjectAmount: Math.round(totalProjectAmount),
      totalHousingSales: Math.round(calcHousingSales),
      totalParkingSales: Math.round(calcParkingSales),
      totalParkingCount: Math.round(totalParkingCount),
    });
  }, [
    calculationMode,
    landPrice,
    targetSellingPrice,
    landArea,
    far,
    bcr,
    bonusRate,
    transferRate,
    transferCostPerPing,
    efficiencyMode,
    efficiencyRate,
    effStair,
    effBalcony,
    effRoofLayers,
    effRoofLimit,
    effBaseLayers,
    effBaseExcavation,
    effBaseAlloc,
    constructionCost,
    overheadRate,
    profitRate,
    includeParking,
    parkingPrice,
    parkingRefArea,
  ]);

  // --- 格式化 ---
  const formatWan = (val) => {
    if (isNaN(val)) return "0";
    return (val / 10000).toFixed(1);
  };
  const formatYi = (val) => {
    if (isNaN(val)) return "0.00";
    return (val / 100000000).toFixed(2);
  };

  // --- 分享功能 ---
  const handleShare = () => {
    const text = `
【房價/地價試算報告】
------------------
${calculationMode === "forward" ? "🏠 預估合理單價：" : "🏗 建議購地單價："} ${
      calculationMode === "forward"
        ? formatWan(result.sellingPrice)
        : formatWan(result.derivedLandPrice)
    } 萬/坪
💰 全案總銷預估：${formatYi(result.totalProjectAmount)} 億
------------------
📊 詳細參數：
• 土地面積：${landArea} 坪
• 總銷建坪：${result.totalSalesPing} 坪
• 營造單價：${formatWan(constructionCost)} 萬
• 銷坪係數：${result.effectiveMultiplier} 倍
${
  calculationMode === "reverse"
    ? `• 設定房價行情：${formatWan(targetSellingPrice)} 萬`
    : ""
}
------------------
🚗 車位規劃：
• 預估數量：${Math.round(result.totalParkingCount)} 車
• 車位總銷：${formatYi(result.totalParkingSales)} 億
------------------
💡 數據由「橙澤國際」房價計算機提供
服務項目：
房地產整合行銷 | 數位廣告投放 | KOL影音行銷
公關活動 | 輔銷道具製作

需要更精準的行銷企劃？
請洽 楊沁安 0926587502

#橙澤國際 #房價試算 #土地開發 #房地產行銷
    `.trim();

    if (navigator.share) {
      navigator
        .share({
          title: "房價推算報告",
          text: text,
        })
        .catch(console.error);
    } else {
      try {
        navigator.clipboard.writeText(text);
        alert("報表已複製到剪貼簿！可直接貼上 LINE");
      } catch (err) {
        alert("無法複製，請手動截圖。");
      }
    }
  };

  // --- 預設模組 ---
  const applyPreset = (type) => {
    setEfficiencyMode("detail");
    if (type === "taipei") {
      // 台北預設
      if (calculationMode === "forward") setLandPrice(2500000);
      else setTargetSellingPrice(1200000);

      setLandArea(150);
      setFar(300);
      setBcr(45);
      setBonusRate(30);
      setTransferRate(30);
      setTransferCostPerPing(800000);
      setEfficiencyRate(1.15);
      setConstructionCost(280000);
      setOverheadRate(18);
      setIncludeParking(true);
      setParkingPrice(3500000);
      setParkingRefArea(45);
    } else if (type === "taichung") {
      // 台中預設
      if (calculationMode === "forward") setLandPrice(900000);
      else setTargetSellingPrice(600000);

      setLandArea(500);
      setFar(250);
      setBcr(50);
      setBonusRate(20);
      setTransferRate(10);
      setTransferCostPerPing(200000);
      setEfficiencyRate(1.2);
      setConstructionCost(200000);
      setOverheadRate(15);
      setIncludeParking(true);
      setParkingPrice(2000000);
      setParkingRefArea(40);
    } else if (type === "kaohsiung") {
      // 南部預設
      if (calculationMode === "forward") setLandPrice(500000);
      else setTargetSellingPrice(350000);

      setLandArea(800);
      setFar(240);
      setBcr(50);
      setBonusRate(30);
      setTransferRate(0);
      setTransferCostPerPing(0);
      setEfficiencyRate(1.25);
      setConstructionCost(180000);
      setOverheadRate(15);
      setIncludeParking(true);
      setParkingPrice(1800000);
      setParkingRefArea(35);
    }
  };

  return (
    <div className="flex justify-center bg-stone-100 min-h-screen font-sans">
      {/* 啟動頁面 */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* 模擬手機容器 */}
      <div className="w-full max-w-md bg-[#F8FAFC] shadow-2xl overflow-hidden flex flex-col h-screen relative">
        {/* 背景裝飾 */}
        <div
          className={`absolute top-0 left-0 w-full h-64 bg-gradient-to-br rounded-b-[40px] z-0 transition-colors duration-500 ${
            calculationMode === "forward"
              ? "from-slate-900 via-slate-800 to-emerald-900"
              : "from-slate-900 via-slate-800 to-amber-900"
          }`}
        ></div>

        {/* 頂部廣告區塊 */}
        <div className="relative z-30 bg-white/10 backdrop-blur-md border-b border-white/10 text-slate-200 text-[10px] leading-relaxed py-2 px-4 mx-4 mt-2 rounded-xl shadow-lg">
          <div className="flex flex-col gap-1 text-center">
            <div className="flex flex-wrap justify-center gap-x-2 font-medium tracking-wide">
              <span className="opacity-80">Powered By 許元平</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-2 text-emerald-300 font-bold">
              <span>廣告合作：橙澤國際 楊沁安 0926587502</span>
            </div>
            {/* 新增服務項目清單 */}
            <div className="text-slate-300/80 scale-95 origin-center leading-tight mt-1">
              服務項目：房地產整合行銷 / 數位廣告投放 / KOL影音行銷 / 公關活動 /
              輔銷道具製作
            </div>
            <a
              href="http://pili.app/fb/HUDAd79a"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 text-white bg-blue-600/90 hover:bg-blue-600 py-1 px-3 rounded-full mx-auto w-fit mt-1 transition-all active:scale-95 no-underline shadow-md shadow-blue-900/20"
            >
              <Facebook className="w-3 h-3" fill="white" />
              <span>官方臉書</span>
            </a>
          </div>
        </div>

        {/* App Header */}
        <div className="relative z-20 px-6 pt-6 pb-2">
          <div className="flex justify-between items-center text-white">
            <div>
              <p className="text-emerald-300 text-xs font-bold tracking-wider uppercase mb-0.5">
                Real Estate Calculator
              </p>
              <h1 className="text-2xl font-bold flex items-center gap-2 drop-shadow-md">
                房價計算機{" "}
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Pro
                </span>
              </h1>
            </div>
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-inner">
              <Calculator className="w-5 h-5 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto z-10 pt-2 pb-24 px-4 no-scrollbar"
        >
          {/* TAB 1: 輸入參數 */}
          {activeTab === "input" && (
            <div className="space-y-5 animate-fade-in-up pb-6">
              {/* 模式切換 Toggle */}
              <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex mb-2">
                <button
                  onClick={() => setCalculationMode("forward")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    calculationMode === "forward"
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" /> 房價推算 (正向)
                </button>
                <button
                  onClick={() => setCalculationMode("reverse")}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    calculationMode === "reverse"
                      ? "bg-amber-500 text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <Map className="w-4 h-4" /> 地價回推 (逆向)
                </button>
              </div>
              {/* 快速模組 */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar pt-2">
                <button
                  onClick={() => applyPreset("taipei")}
                  className="flex-shrink-0 px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-100 hover:border-emerald-200 hover:text-emerald-600 transition-all active:scale-95 flex items-center gap-2"
                >
                  <span className="text-lg">🏠</span> 台北都更
                </button>
                <button
                  onClick={() => applyPreset("taichung")}
                  className="flex-shrink-0 px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-100 hover:border-emerald-200 hover:text-emerald-600 transition-all active:scale-95 flex items-center gap-2"
                >
                  <span className="text-lg">🏙</span> 台中標準
                </button>
                <button
                  onClick={() => applyPreset("kaohsiung")}
                  className="flex-shrink-0 px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-600 shadow-sm border border-slate-100 hover:border-emerald-200 hover:text-emerald-600 transition-all active:scale-95 flex items-center gap-2"
                >
                  <span className="text-lg">🌇</span> 南部標準
                </button>
              </div>
              {/* 卡片：護眼放大設定 */}
              <Card
                title="護眼放大模式"
                icon={Eye}
                bgIconClass="bg-rose-50"
                colorClass="text-rose-600"
              >
                <InputGroup
                  label="介面與字體大小"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  type="range"
                  min={1}
                  max={1.4}
                  step={0.05}
                  unit="倍"
                  helpText="向右滑動可整體放大字體與按鈕，減輕閱讀負擔。"
                />
              </Card>
              {/* 卡片：土地/行情條件 */}
              <Card
                title={calculationMode === "forward" ? "土地條件" : "預期行情"}
                icon={calculationMode === "forward" ? Home : Car}
                bgIconClass={
                  calculationMode === "forward"
                    ? "bg-emerald-50"
                    : "bg-amber-50"
                }
                colorClass={
                  calculationMode === "forward"
                    ? "text-emerald-600"
                    : "text-amber-600"
                }
              >
                {calculationMode === "forward" ? (
                  <InputGroup
                    label="成交單價 (萬/坪)"
                    value={landPrice}
                    onChange={(e) => setLandPrice(Number(e.target.value))}
                    unit="元/坪"
                  />
                ) : (
                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 mb-4">
                    <InputGroup
                      label="周邊行情 (萬/坪)"
                      value={targetSellingPrice}
                      onChange={(e) =>
                        setTargetSellingPrice(Number(e.target.value))
                      }
                      unit="元/坪"
                      highlight={true}
                      helpText="請輸入您預期的未來建案平均成交單價，系統將回推您可以用多少錢買地。"
                    />
                  </div>
                )}

                <div className="h-px bg-slate-100 my-4"></div>
                <InputGroup
                  label="土地面積"
                  value={landArea}
                  onChange={(e) => setLandArea(Number(e.target.value))}
                  unit="坪"
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InputGroup
                    label="法定容積"
                    value={far}
                    onChange={(e) => setFar(Number(e.target.value))}
                    unit="%"
                    tooltip="基地內建築物總樓地板面積與基地面積之比。數值越高，可蓋樓層越高。"
                  />
                  {efficiencyMode === "detail" && (
                    <InputGroup
                      label="建蔽率"
                      value={bcr}
                      onChange={(e) => setBcr(Number(e.target.value))}
                      unit="%"
                      tooltip="建築投影面積占基地面積之比率。決定了一層能蓋多大，剩餘為空地。"
                    />
                  )}
                </div>
              </Card>
              {/* 卡片：免計容積 */}
              <Card
                title="免計容積設定"
                icon={Layers}
                bgIconClass="bg-purple-50"
                colorClass="text-purple-600"
                action={
                  <button
                    onClick={() =>
                      setEfficiencyMode(
                        efficiencyMode === "simple" ? "detail" : "simple"
                      )
                    }
                    className="text-xs bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-slate-500 transition flex items-center gap-1 font-medium"
                  >
                    {efficiencyMode === "simple" ? "切換詳細" : "切換簡易"}
                    {efficiencyMode === "simple" ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronUp className="w-3 h-3" />
                    )}
                  </button>
                }
              >
                {efficiencyMode === "simple" ? (
                  <InputGroup
                    label="免計係數 (簡易)"
                    value={efficiencyRate}
                    onChange={(e) => setEfficiencyRate(Number(e.target.value))}
                    step={0.05}
                    helpText="一般大樓約 1.15 ~ 1.25，包含陽台、梯廳、屋突等所有免計項目。"
                    tooltip="法規允許不計入容積的項目(如梯廳、陽台、機房等)，可增加實際銷售坪數。"
                  />
                ) : (
                  <div className="space-y-4">
                    {/* 1. 基本免計 */}
                    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>{" "}
                        基本免計
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <InputGroup
                          label="梯廳 Core"
                          value={effStair}
                          onChange={(e) => setEffStair(Number(e.target.value))}
                          unit="%"
                          step={0.1}
                        />
                        <InputGroup
                          label="陽台"
                          value={effBalcony}
                          onChange={(e) =>
                            setEffBalcony(Number(e.target.value))
                          }
                          unit="%"
                          step={0.1}
                        />
                      </div>
                    </div>

                    {/* 2. 屋突設施 */}
                    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>{" "}
                        屋突設施 (PH)
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <InputGroup
                          label="上限"
                          value={effRoofLimit}
                          onChange={(e) =>
                            setEffRoofLimit(Number(e.target.value))
                          }
                          unit="%"
                          step={0.1}
                        />
                        <InputGroup
                          label="層數"
                          value={effRoofLayers}
                          onChange={(e) =>
                            setEffRoofLayers(Number(e.target.value))
                          }
                          unit="層"
                        />
                      </div>
                      {/* 結果與說明恢復 */}
                      <div className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-sm flex flex-col gap-1">
                        <div className="flex justify-between items-center border-b border-purple-50 pb-1 mb-1">
                          <span className="text-[10px] text-purple-800">
                            公式：建蔽 × 上限 × 層數
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400">
                            計入%
                          </span>
                          <span className="text-purple-600 font-bold text-sm">
                            {(
                              (bcr * effRoofLimit * effRoofLayers) /
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3. 地下室公設 */}
                    <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>{" "}
                        地下室公設 (B1~)
                      </p>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <InputGroup
                          label="開挖層數"
                          value={effBaseLayers}
                          onChange={(e) =>
                            setEffBaseLayers(Number(e.target.value))
                          }
                          unit="層"
                        />
                        <InputGroup
                          label="開挖率"
                          value={effBaseExcavation}
                          onChange={(e) =>
                            setEffBaseExcavation(Number(e.target.value))
                          }
                          unit="%"
                        />
                        <InputGroup
                          label="轉化率"
                          value={effBaseAlloc}
                          onChange={(e) =>
                            setEffBaseAlloc(Number(e.target.value))
                          }
                          unit="%"
                        />
                      </div>
                      {/* 結果與說明恢復 */}
                      <div className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-sm flex flex-col gap-1">
                        <div className="flex justify-between items-center border-b border-purple-50 pb-1 mb-1">
                          <span className="text-[10px] text-purple-800">
                            計入銷坪FA = (層數×開挖率) × 轉化率
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-slate-400">
                            計入%
                          </span>
                          <span className="text-purple-600 font-bold text-sm">
                            {(
                              (effBaseLayers *
                                effBaseExcavation *
                                effBaseAlloc) /
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-dashed border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-medium">
                      總銷坪係數預估
                    </span>
                    <span className="text-xl font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
                      {result.effectiveMultiplier} 倍
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">
                    基本區間約為1.6-1.7，實際依基地條件及適用建築法規為準。
                  </p>
                </div>
              </Card>
              {/* 卡片：獎勵與移轉 */}
              <Card
                title="獎勵與移轉"
                icon={Map}
                bgIconClass="bg-indigo-50"
                colorClass="text-indigo-600"
              >
                <InputGroup
                  label="容積獎勵"
                  value={bonusRate}
                  onChange={(e) => setBonusRate(Number(e.target.value))}
                  type="range"
                  min={0}
                  max={100}
                  unit="%"
                  tooltip="政府為鼓勵特定建設(如開放空間、都更、危老)額外給予的容積額度。"
                />
                <InputGroup
                  label="容積移轉"
                  value={transferRate}
                  onChange={(e) => setTransferRate(Number(e.target.value))}
                  type="range"
                  min={0}
                  max={100}
                  unit="%"
                  tooltip="將其他可建築土地(如道路用地)的容積移轉至本基地建築使用，需支付成本購買。"
                />
                {transferRate > 0 && (
                  <div className="mt-4 animate-fade-in">
                    <InputGroup
                      label="容移取得成本"
                      value={transferCostPerPing}
                      onChange={(e) =>
                        setTransferCostPerPing(Number(e.target.value))
                      }
                      unit="元/坪容"
                    />
                  </div>
                )}
              </Card>
              {/* 卡片：營造與利潤 */}
              <Card
                title="營造與利潤"
                icon={Building}
                bgIconClass="bg-orange-50"
                colorClass="text-orange-600"
              >
                <InputGroup
                  label="營造單價"
                  value={constructionCost}
                  onChange={(e) => setConstructionCost(Number(e.target.value))}
                  unit="元/坪"
                  step={1000}
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InputGroup
                    label="管銷費用"
                    value={overheadRate}
                    onChange={(e) => setOverheadRate(Number(e.target.value))}
                    unit="%"
                    tooltip="包含建築規劃設計、廣告行銷、公司營運管理及稅務規費等間接成本。"
                  />
                  <InputGroup
                    label="預期利潤"
                    value={profitRate}
                    onChange={(e) => setProfitRate(Number(e.target.value))}
                    unit="%"
                    tooltip="建商開發此案預期獲得的毛利潤率 (利潤/總成本)。"
                  />
                </div>
              </Card>
              {/* 卡片：車位 */}
              <Card
                title="車位銷售預估"
                icon={Car}
                bgIconClass="bg-blue-50"
                colorClass="text-blue-600"
                action={
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      includeParking ? "bg-blue-500" : "bg-slate-200"
                    }`}
                    onClick={() => setIncludeParking(!includeParking)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        includeParking ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                }
              >
                {includeParking ? (
                  <div className="animate-fade-in space-y-4">
                    {/* 修改部分：平均售價單位改為萬元，並使用除以10000後的值進行顯示與輸入，onChange 再乘回 */}
                    <InputGroup
                      label="平均售價"
                      value={parkingPrice / 10000}
                      onChange={(e) =>
                        setParkingPrice(Number(e.target.value) * 10000)
                      }
                      type="range"
                      min={100}
                      max={500}
                      step={5}
                      unit="萬/位"
                    />
                    <InputGroup
                      label="車位配比"
                      value={parkingRefArea}
                      onChange={(e) =>
                        setParkingRefArea(Number(e.target.value))
                      }
                      type="range"
                      min={20}
                      max={60}
                      unit="坪/位"
                      helpText="每銷售多少坪房地會配置一個車位(通常約30-45坪)"
                    />

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-center">
                        <span className="text-xs text-blue-500 font-medium block mb-1">
                          預估數量
                        </span>
                        <span className="text-xl font-bold text-slate-700">
                          {Math.round(result.totalParkingCount)}
                        </span>
                      </div>
                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-center">
                        <span className="text-xs text-blue-500 font-medium block mb-1">
                          車位總銷
                        </span>
                        <span className="text-xl font-bold text-slate-700">
                          {formatYi(result.totalParkingSales)}億
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-slate-400 text-sm">
                    此專案不計算車位銷售
                  </div>
                )}
              </Card>
              <div className="h-8"></div> {/* Spacer */}
            </div>
          )}

          {/* TAB 2: 計算結果 */}
          {activeTab === "result" && (
            <div className="space-y-5 animate-fade-in-up pb-6 pt-2">
              {/* 黑卡風格總價卡片 */}
              <div
                className={`bg-gradient-to-br rounded-[24px] p-6 text-white shadow-2xl shadow-slate-300 relative overflow-hidden ring-1 ring-white/10 transition-colors duration-500 ${
                  calculationMode === "forward"
                    ? "from-slate-800 to-slate-900"
                    : "from-slate-800 via-slate-800 to-amber-900"
                }`}
              >
                {/* 裝飾光暈 */}
                <div
                  className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
                    calculationMode === "forward"
                      ? "bg-emerald-500/20"
                      : "bg-amber-500/20"
                  }`}
                ></div>
                <div className="absolute -left-10 bottom-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* 浮水印 */}
                <div className="absolute bottom-4 right-4 text-white/5 text-4xl font-bold pointer-events-none select-none tracking-widest uppercase italic">
                  Chengze
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-1 h-4 rounded-full ${
                        calculationMode === "forward"
                          ? "bg-emerald-400"
                          : "bg-amber-400"
                      }`}
                    ></div>
                    <p className="text-slate-300 text-sm font-medium tracking-wide">
                      {calculationMode === "forward"
                        ? "預估合理推案單價"
                        : "建議購地單價"}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span
                      className={`text-5xl font-bold tracking-tight text-white drop-shadow-lg ${
                        calculationMode === "reverse" ? "text-amber-400" : ""
                      }`}
                    >
                      {calculationMode === "forward"
                        ? formatWan(result.sellingPrice)
                        : formatWan(result.derivedLandPrice)}
                    </span>
                    <span className="text-xl font-medium text-slate-400">
                      萬 / 坪
                    </span>
                  </div>

                  {/* 分隔線 */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-xs mb-1">
                        全案總銷金額
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          calculationMode === "forward"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        {formatYi(result.totalProjectAmount)} 億
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs mb-1">總銷售坪數</p>
                      <p className="text-2xl font-bold text-white">
                        {result.totalSalesPing} 坪
                      </p>
                    </div>
                  </div>

                  {/* 詳細小數據 */}
                  <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
                    {calculationMode === "forward" && (
                      <>
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex-shrink-0">
                          <span className="text-[10px] text-slate-300 block">
                            房屋預估總銷
                          </span>
                          <span className="text-sm font-bold">
                            {formatYi(result.totalHousingSales)} 億
                          </span>
                        </div>
                        {includeParking && (
                          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex-shrink-0">
                            <span className="text-[10px] text-slate-300 block">
                              車位預估總銷 (
                              {Math.round(result.totalParkingCount)}車)
                            </span>
                            <span className="text-sm font-bold">
                              {formatYi(result.totalParkingSales)} 億
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex-shrink-0">
                      <span className="text-[10px] text-slate-300 block">
                        土地成交總價
                      </span>
                      <span className="text-sm font-bold">
                        {formatYi(
                          (calculationMode === "forward"
                            ? landPrice
                            : result.derivedLandPrice) * landArea
                        )}{" "}
                        億
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 成本結構卡片 */}
              <Card
                title="成本結構分析預估"
                icon={PieChart}
                bgIconClass="bg-slate-100"
                colorClass="text-slate-600"
              >
                {/* 條狀圖 */}
                <div className="flex h-6 w-full rounded-full overflow-hidden mb-6 shadow-inner bg-slate-100">
                  <div
                    style={{
                      width: `${
                        (result.landCostPerPing / result.sellingPrice) * 100
                      }%`,
                    }}
                    className="bg-indigo-500 transition-all duration-1000"
                  ></div>
                  <div
                    style={{
                      width: `${
                        (result.constructionCost / result.sellingPrice) * 100
                      }%`,
                    }}
                    className="bg-orange-400 transition-all duration-1000"
                  ></div>
                  <div
                    style={{
                      width: `${
                        (result.marketingExp / result.sellingPrice) * 100
                      }%`,
                    }}
                    className="bg-blue-400 transition-all duration-1000"
                  ></div>
                  <div
                    style={{
                      width: `${(result.profit / result.sellingPrice) * 100}%`,
                    }}
                    className="bg-emerald-400 transition-all duration-1000"
                  ></div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "土地成本",
                      val: result.landCostPerPing,
                      color: "bg-indigo-500",
                      text: "text-indigo-600",
                    },
                    {
                      label: "營造費用",
                      val: result.constructionCost,
                      color: "bg-orange-400",
                      text: "text-orange-600",
                    },
                    {
                      label: "管銷費用",
                      val: result.marketingExp,
                      color: "bg-blue-400",
                      text: "text-blue-600",
                    },
                    {
                      label: "建商利潤",
                      val: result.profit,
                      color: "bg-emerald-400",
                      text: "text-emerald-600",
                      isLast: true,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center ${
                        item.isLast
                          ? "pt-3 border-t border-dashed border-slate-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${item.color} shadow-sm`}
                        ></div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {result.sellingPrice > 0
                              ? Math.round(
                                  (item.val / result.sellingPrice) * 100
                                )
                              : 0}
                            % 佔比
                          </span>
                        </div>
                      </div>
                      <span
                        className={`font-bold font-mono text-lg ${
                          item.isLast ? item.text : "text-slate-800"
                        }`}
                      >
                        {formatWan(item.val)}{" "}
                        <span className="text-xs text-slate-400 font-sans font-normal">
                          萬
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 提示與分享 */}
              <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-100 text-sm text-amber-800 leading-relaxed flex gap-3 shadow-sm">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <span className="font-bold block mb-1 text-amber-900">
                    市場行情判讀：
                  </span>
                  若周邊新案市價高於{" "}
                  <strong>{formatWan(result.sellingPrice)} 萬/坪</strong>
                  ，代表本案可能享有品牌溢價或超額利潤空間。
                </div>
              </div>

              {/* 專業服務引流卡片 (新增) */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 rounded-2xl shadow-lg border border-slate-700/50 relative overflow-hidden group cursor-pointer hover:shadow-emerald-500/10 transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-500/20 rounded-xl flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">
                        有建案或土地想行銷？
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mb-4">
                        橙澤國際提供全方位的土地開發評估與數位整合行銷服務。立即預約，讓您的資產價值最大化。
                      </p>
                      <a
                        href="tel:0926587502"
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg transition-colors font-bold text-sm shadow-lg shadow-emerald-500/20"
                      >
                        <Phone className="w-4 h-4" /> 想更快完銷 請聯絡我們
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-4 rounded-xl transition-all shadow-lg shadow-[#06C755]/20 active:scale-[0.98] font-bold text-lg"
                >
                  <LineIcon className="w-6 h-6" /> LINE 分享試算結果
                </button>
              </div>

              <div className="h-8"></div>
            </div>
          )}
        </div>

        {/* Floating Bottom Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[360px]">
          <div className="bg-white/90 backdrop-blur-xl rounded-full p-1.5 shadow-2xl shadow-slate-300/50 border border-white/50 flex justify-between relative">
            {/* Active Indicator Background */}
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-slate-900 rounded-full transition-all duration-300 ease-spring ${
                activeTab === "input" ? "left-1.5" : "left-[calc(50%+3px)]"
              }`}
            ></div>

            <button
              onClick={() => setActiveTab("input")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full transition-colors relative z-10 ${
                activeTab === "input"
                  ? "text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-sm font-bold">參數設定</span>
            </button>

            <button
              onClick={() => setActiveTab("result")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full transition-colors relative z-10 ${
                activeTab === "result"
                  ? "text-white"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <PieChart className="w-5 h-5" />
              <span className="text-sm font-bold">計算結果</span>
            </button>
          </div>
        </div>
      </div>

      {/* 桌面端提示 */}
      <div className="hidden lg:flex fixed left-10 top-1/2 -translate-y-1/2 flex-col gap-6 max-w-sm">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">
            📱
          </div>
          <h3 className="text-slate-800 font-bold text-2xl mb-2">
            手機版預覽模式
          </h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            這是專為手機設計的介面。包含毛玻璃特效、滑順的動畫以及更適合觸控的操作元件。
          </p>
          <div className="text-sm text-slate-400 pt-4 border-t border-slate-100">
            提示：在手機瀏覽器點擊「分享」→「加入主畫面」，即可獲得最佳體驗。
          </div>
        </div>
      </div>

      {/* Global CSS Style for hiding scrollbar & animations */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
