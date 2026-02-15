// v1.5.0
function main(config) {
  const allProxies = config.proxies || [];
  const CDN_BASE = "https://cdn.jsdelivr.net/gh/";
  const FLAGS_CDN = `${CDN_BASE}lipis/flag-icons@main/flags/4x3/`;

  const regions = {
    "🇺🇸美国": `${FLAGS_CDN}us.svg`,
    "🇯🇵日本": `${FLAGS_CDN}jp.svg`,
    "🇰🇷韩国": `${FLAGS_CDN}kr.svg`,
    "🇭🇰香港": `${FLAGS_CDN}hk.svg`,
    "🇹🇼台湾": `${FLAGS_CDN}tw.svg`,
    "🇸🇬新加坡": `${FLAGS_CDN}sg.svg`,
    "🇬🇧英国": `${FLAGS_CDN}gb.svg`,
    "🇩🇪德国": `${FLAGS_CDN}de.svg`,
    "🇳🇱荷兰": `${FLAGS_CDN}nl.svg`,
    "🇫🇷法国": `${FLAGS_CDN}fr.svg`,
    "🇦🇺澳大利亚": `${FLAGS_CDN}au.svg`,
    "🇨🇦加拿大": `${FLAGS_CDN}ca.svg`,
    "🇮🇳印度": `${FLAGS_CDN}in.svg`,
    "🇷🇺俄罗斯": `${FLAGS_CDN}ru.svg`,
    "🇫🇮芬兰": `${FLAGS_CDN}fi.svg`,
    "🇵🇱波兰": `${FLAGS_CDN}pl.svg`,
    "🇻🇳越南": `${FLAGS_CDN}vn.svg`,
    "🇹🇭泰国": `${FLAGS_CDN}th.svg`,
    "🇧🇷巴西": `${FLAGS_CDN}br.svg`,
    "🇨🇴哥伦比亚": `${FLAGS_CDN}co.svg`,
    "🇮🇸冰岛": `${FLAGS_CDN}is.svg`,
    "🇪🇸西班牙": `${FLAGS_CDN}es.svg`,
    "🇮🇹意大利": `${FLAGS_CDN}it.svg`,
    "🇳🇴挪威": `${FLAGS_CDN}no.svg`,
    "🇿🇦南非": `${FLAGS_CDN}za.svg`,
    "🇲🇽墨西哥": `${FLAGS_CDN}mx.svg`,
    "🇮🇩印尼": `${FLAGS_CDN}id.svg`,
  };

  const regionFilters = {
    "🇺🇸美国": "🇺🇸",
    "🇯🇵日本": "🇯🇵",
    "🇰🇷韩国": "🇰🇷",
    "🇭🇰香港": "🇭🇰",
    "🇹🇼台湾": "🇹🇼",
    "🇸🇬新加坡": "🇸🇬",
    "🇬🇧英国": "🇬🇧",
    "🇩🇪德国": "🇩🇪",
    "🇳🇱荷兰": "🇳🇱",
    "🇫🇷法国": "🇫🇷",
    "🇦🇺澳大利亚": "🇦🇺",
    "🇨🇦加拿大": "🇨🇦",
    "🇮🇳印度": "🇮🇳",
    "🇷🇺俄罗斯": "🇷🇺",
    "🇫🇮芬兰": "🇫🇮",
    "🇵🇱波兰": "🇵🇱",
    "🇻🇳越南": "🇻🇳",
    "🇹🇭泰国": "🇹🇭",
    "🇧🇷巴西": "🇧🇷",
    "🇨🇴哥伦比亚": "🇨🇴",
    "🇮🇸冰岛": "🇮🇸",
    "🇪🇸西班牙": "🇪🇸",
    "🇮🇹意大利": "🇮🇹",
    "🇳🇴挪威": "🇳🇴",
    "🇿🇦南非": "🇿🇦",
    "🇲🇽墨西哥": "🇲🇽",
    "🇮🇩印尼": "🇮🇩",
  };

  const allFilter = Object.values(regionFilters).join("|");
  const allRegions = Object.keys(regions);

  const availableRegions = allRegions.filter((region) => {
    const regex = new RegExp(regionFilters[region], "i");
    return allProxies.some((p) => regex.test(p.name));
  });

  const globalStrategies = [
    "自动选择",
    "自动回退",
    "负载均衡-轮询",
    "负载均衡-哈希",
    "负载均衡-粘滞",
    "手动切换",
  ];

  const proxyGroups = [];

  const nodeSelectionProxies = [...availableRegions, ...globalStrategies, "DIRECT"];
  proxyGroups.push({
    name: "节点选择",
    icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Proxy.png`,
    type: "select",
    proxies: nodeSelectionProxies,
  });

  proxyGroups.push({
    name: "自动选择",
    icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Auto.png`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "url-test",
    interval: 300,
    tolerance: 50,
  });

  proxyGroups.push({
    name: "自动回退",
    icon: `${CDN_BASE}shindgewongxj/WHATSINStash@master/icon/fallback.png`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "fallback",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
  });

  proxyGroups.push({
    name: "负载均衡-轮询",
    icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "round-robin",
  });

  proxyGroups.push({
    name: "负载均衡-哈希",
    icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "consistent-hashing",
  });

  proxyGroups.push({
    name: "负载均衡-粘滞",
    icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "sticky-sessions",
  });

  proxyGroups.push({
    name: "手动切换",
    icon: `${CDN_BASE}shindgewongxj/WHATSINStash@master/icon/select.png`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "select",
  });

  for (const region of availableRegions) {
    proxyGroups.push({
      name: region,
      icon: regions[region],
      "include-all": true,
      filter: regionFilters[region],
      type: "url-test",
      interval: 300,
      tolerance: 50,
    });
  }

  proxyGroups.push({
    name: "广告拦截",
    icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/AdBlack.png`,
    type: "select",
    proxies: ["REJECT", "DIRECT"],
  });

  proxyGroups.push({
    name: "应用净化",
    icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Hijacking.png`,
    type: "select",
    proxies: ["REJECT", "DIRECT"],
  });

  const finalProxies = ["节点选择", ...availableRegions, ...globalStrategies, "DIRECT"];
  proxyGroups.push({
    name: "漏网之鱼",
    icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Final.png`,
    type: "select",
    proxies: finalProxies,
  });

  const globalProxies = ["节点选择", ...globalStrategies, ...availableRegions, "广告拦截", "应用净化", "漏网之鱼"];
  proxyGroups.push({
    name: "GLOBAL",
    icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Global.png`,
    "include-all": true,
    type: "select",
    proxies: globalProxies,
  });

  config["proxy-groups"] = proxyGroups;

  config["rule-providers"] = {
    reject: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
      path: "./ruleset/reject.yaml",
      interval: 86400,
    },
    direct: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
      path: "./ruleset/direct.yaml",
      interval: 86400,
    },
    proxy: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
      path: "./ruleset/proxy.yaml",
      interval: 86400,
    },
    gfw: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      path: "./ruleset/gfw.yaml",
      interval: 86400,
    },
    cncidr: {
      type: "http",
      behavior: "ipcidr",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
      path: "./ruleset/cncidr.yaml",
      interval: 86400,
    },
    lancidr: {
      type: "http",
      behavior: "ipcidr",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
      path: "./ruleset/lancidr.yaml",
      interval: 86400,
    },
    telegramcidr: {
      type: "http",
      behavior: "ipcidr",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
      path: "./ruleset/telegramcidr.yaml",
      interval: 86400,
    },
    icloud: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
      path: "./ruleset/icloud.yaml",
      interval: 86400,
    },
    apple: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
      path: "./ruleset/apple.yaml",
      interval: 86400,
    },
    applications: {
      type: "http",
      behavior: "classical",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
      path: "./ruleset/applications.yaml",
      interval: 86400,
    },
  };

  config["rules"] = [
    "RULE-SET,applications,DIRECT",
    "RULE-SET,lancidr,DIRECT",
    "RULE-SET,reject,广告拦截",
    "RULE-SET,icloud,DIRECT",
    "RULE-SET,apple,DIRECT",
    "RULE-SET,direct,DIRECT",
    "RULE-SET,proxy,节点选择",
    "RULE-SET,gfw,节点选择",
    "RULE-SET,telegramcidr,节点选择",
    "GEOIP,CN,DIRECT",
    "MATCH,漏网之鱼",
  ];

  return config;
}
