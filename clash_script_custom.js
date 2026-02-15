// v1.2.1
function main(config) {
  const allProxies = config.proxies || [];
  const CDN_BASE = "https://cdn.jsdelivr.net/gh/";
  const FLAGS_CDN = `${CDN_BASE}lipis/flag-icons@main/flags/4x3/`;

  const regions = {
    US美国: `${FLAGS_CDN}us.svg`,
    JP日本: `${FLAGS_CDN}jp.svg`,
    KR韩国: `${FLAGS_CDN}kr.svg`,
    HK香港: `${FLAGS_CDN}hk.svg`,
    TW台湾: `${FLAGS_CDN}tw.svg`,
    SG新加坡: `${FLAGS_CDN}sg.svg`,
    GB英国: `${FLAGS_CDN}gb.svg`,
    DE德国: `${FLAGS_CDN}de.svg`,
    NL荷兰: `${FLAGS_CDN}nl.svg`,
    FR法国: `${FLAGS_CDN}fr.svg`,
    AU澳大利亚: `${FLAGS_CDN}au.svg`,
    CA加拿大: `${FLAGS_CDN}ca.svg`,
    IN印度: `${FLAGS_CDN}in.svg`,
    RU俄罗斯: `${FLAGS_CDN}ru.svg`,
    FI芬兰: `${FLAGS_CDN}fi.svg`,
    PL波兰: `${FLAGS_CDN}pl.svg`,
    VN越南: `${FLAGS_CDN}vn.svg`,
    TH泰国: `${FLAGS_CDN}th.svg`,
    BR巴西: `${FLAGS_CDN}br.svg`,
    CO哥伦比亚: `${FLAGS_CDN}co.svg`,
    IS冰岛: `${FLAGS_CDN}is.svg`,
    ES西班牙: `${FLAGS_CDN}es.svg`,
    IT意大利: `${FLAGS_CDN}it.svg`,
    NO挪威: `${FLAGS_CDN}no.svg`,
    ZA南非: `${FLAGS_CDN}za.svg`,
    MX墨西哥: `${FLAGS_CDN}mx.svg`,
    ID印尼: `${FLAGS_CDN}id.svg`,
  };

  const regionFilters = {
    US美国: "美|US|United States|美国",
    JP日本: "日本|JP|Japan",
    KR韩国: "韩国|KR|Korea",
    HK香港: "港|HK|hk|Hong Kong",
    TW台湾: "台|TW|Taiwan",
    SG新加坡: "新加坡|SG|Singapore|坡|狮城",
    GB英国: "英国|GB|UK|United Kingdom",
    DE德国: "德国|DE|Germany",
    NL荷兰: "荷兰|NL|Netherlands",
    FR法国: "法国|FR|France",
    AU澳大利亚: "澳大利亚|AU|Australia",
    CA加拿大: "加拿大|CA|Canada",
    IN印度: "印度|IN|India",
    RU俄罗斯: "俄罗斯|RU|Russia",
    FI芬兰: "芬兰|FI|Finland",
    PL波兰: "波兰|PL|Poland",
    VN越南: "越南|VN|Vietnam",
    TH泰国: "泰国|TH|Thailand",
    BR巴西: "巴西|BR|Brazil",
    CO哥伦比亚: "哥伦比亚|CO|Colombia",
    IS冰岛: "冰岛|IS|Iceland",
    ES西班牙: "西班牙|ES|Spain",
    IT意大利: "意大利|IT|Italy",
    NO挪威: "挪威|NO|Norway",
    ZA南非: "南非|ZA|South Africa",
    MX墨西哥: "墨西哥|MX|Mexico",
    ID印尼: "印尼|ID|Indonesia",
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
    LocalAreaNetwork: {
      url: `${CDN_BASE}ACL4SSR/ACL4SSR@master/Clash/LocalAreaNetwork.list`,
      path: "./ruleset/LocalAreaNetwork.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    UnBan: {
      url: `${CDN_BASE}ACL4SSR/ACL4SSR@master/Clash/UnBan.list`,
      path: "./ruleset/UnBan.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    BanAD: {
      url: `${CDN_BASE}ACL4SSR/ACL4SSR@master/Clash/BanAD.list`,
      path: "./ruleset/BanAD.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    BanProgramAD: {
      url: `${CDN_BASE}ACL4SSR/ACL4SSR@master/Clash/BanProgramAD.list`,
      path: "./ruleset/BanProgramAD.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    ProxyGFWlist: {
      url: `${CDN_BASE}ACL4SSR/ACL4SSR@master/Clash/ProxyGFWlist.list`,
      path: "./ruleset/ProxyGFWlist.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
    ChinaDomain: {
      url: `${CDN_BASE}ACL4SSR/ACL4SSR@master/Clash/ChinaDomain.list`,
      path: "./ruleset/ChinaDomain.list",
      behavior: "domain",
      interval: 86400,
      format: "text",
      type: "http",
    },
    ChinaCompanyIp: {
      url: `${CDN_BASE}ACL4SSR/ACL4SSR@master/Clash/ChinaCompanyIp.list`,
      path: "./ruleset/ChinaCompanyIp.list",
      behavior: "ipcidr",
      interval: 86400,
      format: "text",
      type: "http",
    },
    Download: {
      url: `${CDN_BASE}ACL4SSR/ACL4SSR@master/Clash/Download.list`,
      path: "./ruleset/Download.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http",
    },
  };

  config["rules"] = [
    "RULE-SET,LocalAreaNetwork,DIRECT",
    "RULE-SET,UnBan,DIRECT",
    "RULE-SET,BanAD,广告拦截",
    "RULE-SET,BanProgramAD,应用净化",
    "RULE-SET,ProxyGFWlist,节点选择",
    "RULE-SET,ChinaDomain,DIRECT",
    "RULE-SET,ChinaCompanyIp,DIRECT",
    "RULE-SET,Download,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,漏网之鱼",
  ];

  return config;
}
