// v2.1.0
function main(config) {
  const allProxies = config.proxies || [];
  const CDN = "https://cdn.jsdelivr.net/gh/";
  const CDN_FLAGS = `${CDN}lipis/flag-icons@main/flags/4x3/`;
  const CDN_QURE = `${CDN}Koolson/Qure@master/IconSet/Color/`;
  const CDN_VERGE = `${CDN}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/`;
  const CDN_STASH = `${CDN}shindgewongxj/WHATSINStash@master/icon/`;

  const regions = {
    "🇨🇳中国": { flag: "cn", filter: "🇨🇳" },
    "🇺🇸美国": { flag: "us", filter: "🇺🇸" },
    "🇯🇵日本": { flag: "jp", filter: "🇯🇵" },
    "🇰🇷韩国": { flag: "kr", filter: "🇰🇷" },
    "🇭🇰香港": { flag: "hk", filter: "🇭🇰" },
    "🇹🇼台湾": { flag: "tw", filter: "🇹🇼" },
    "🇸🇬新加坡": { flag: "sg", filter: "🇸🇬" },
    "🇬🇧英国": { flag: "gb", filter: "🇬🇧" },
    "🇩🇪德国": { flag: "de", filter: "🇩🇪" },
    "🇳🇱荷兰": { flag: "nl", filter: "🇳🇱" },
    "🇫🇷法国": { flag: "fr", filter: "🇫🇷" },
    "🇦🇺澳大利亚": { flag: "au", filter: "🇦🇺" },
    "🇨🇦加拿大": { flag: "ca", filter: "🇨🇦" },
    "🇮🇳印度": { flag: "in", filter: "🇮🇳" },
    "🇷🇺俄罗斯": { flag: "ru", filter: "🇷🇺" },
    "🇫🇮芬兰": { flag: "fi", filter: "🇫🇮" },
    "🇵🇱波兰": { flag: "pl", filter: "🇵🇱" },
    "🇻🇳越南": { flag: "vn", filter: "🇻🇳" },
    "🇹🇭泰国": { flag: "th", filter: "🇹🇭" },
    "🇧🇷巴西": { flag: "br", filter: "🇧🇷" },
    "🇨🇴哥伦比亚": { flag: "co", filter: "🇨🇴" },
    "🇮🇸冰岛": { flag: "is", filter: "🇮🇸" },
    "🇪🇸西班牙": { flag: "es", filter: "🇪🇸" },
    "🇮🇹意大利": { flag: "it", filter: "🇮🇹" },
    "🇳🇴挪威": { flag: "no", filter: "🇳🇴" },
    "🇿🇦南非": { flag: "za", filter: "🇿🇦" },
    "🇲🇽墨西哥": { flag: "mx", filter: "🇲🇽" },
    "🇮🇩印尼": { flag: "id", filter: "🇮🇩" },
  };

  const availableRegions = Object.keys(regions).filter((region) => {
    const regex = new RegExp(regions[region].filter, "i");
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

  proxyGroups.push({
    name: "节点选择",
    icon: `${CDN_QURE}Proxy.png`,
    type: "select",
    proxies: [...availableRegions, ...globalStrategies, "DIRECT"],
  });

  proxyGroups.push({
    name: "自动选择",
    icon: `${CDN_QURE}Auto.png`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "url-test",
    interval: 300,
    tolerance: 50,
  });

  proxyGroups.push({
    name: "自动回退",
    icon: `${CDN_STASH}fallback.png`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "fallback",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
  });

  proxyGroups.push({
    name: "负载均衡-轮询",
    icon: `${CDN_VERGE}balance.svg`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "round-robin",
  });

  proxyGroups.push({
    name: "负载均衡-哈希",
    icon: `${CDN_VERGE}merry_go.svg`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "consistent-hashing",
  });

  proxyGroups.push({
    name: "负载均衡-粘滞",
    icon: `${CDN_VERGE}link.svg`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "sticky-sessions",
  });

  proxyGroups.push({
    name: "手动切换",
    icon: `${CDN_STASH}select.png`,
    "include-all": true,
    "exclude-filter": "CN|China",
    type: "select",
  });

  for (const region of availableRegions) {
    proxyGroups.push({
      name: region,
      icon: `${CDN_FLAGS}${regions[region].flag}.svg`,
      "include-all": true,
      filter: regions[region].filter,
      type: "url-test",
      interval: 300,
      tolerance: 50,
    });
  }

  proxyGroups.push({
    name: "广告拦截",
    icon: `${CDN_QURE}AdBlack.png`,
    type: "select",
    proxies: ["REJECT", "DIRECT"],
  });

  proxyGroups.push({
    name: "应用净化",
    icon: `${CDN_QURE}Hijacking.png`,
    type: "select",
    proxies: ["REJECT", "DIRECT"],
  });

  proxyGroups.push({
    name: "漏网之鱼",
    icon: `${CDN_QURE}Final.png`,
    type: "select",
    proxies: ["节点选择", ...availableRegions, ...globalStrategies, "DIRECT"],
  });

  proxyGroups.push({
    name: "GLOBAL",
    icon: `${CDN_QURE}Global.png`,
    "include-all": true,
    type: "select",
    proxies: [
      "节点选择",
      ...globalStrategies,
      ...availableRegions,
      "广告拦截",
      "应用净化",
      "漏网之鱼",
    ],
  });

  config["proxy-groups"] = proxyGroups;

  const ruleProviderBase = { type: "http", interval: 86400 };
  const ruleProvidersData = [
    { name: "reject", behavior: "domain" },
    { name: "private", behavior: "domain" },
    { name: "icloud", behavior: "domain" },
    { name: "apple", behavior: "domain" },
    { name: "google", behavior: "domain" },
    { name: "proxy", behavior: "domain" },
    { name: "direct", behavior: "domain" },
    { name: "gfw", behavior: "domain" },
    { name: "lancidr", behavior: "ipcidr" },
    { name: "cncidr", behavior: "ipcidr" },
    { name: "telegramcidr", behavior: "ipcidr" },
    { name: "applications", behavior: "classical" },
  ];

  config["rule-providers"] = Object.fromEntries(
    ruleProvidersData.map(({ name, behavior }) => [
      name,
      {
        ...ruleProviderBase,
        behavior,
        url: `${CDN}Loyalsoldier/clash-rules@release/${name}.txt`,
        path: `./ruleset/${name}.yaml`,
      },
    ]),
  );

  config["rules"] = [
    "RULE-SET,applications,DIRECT",
    "DOMAIN,clash.razord.top,DIRECT",
    "DOMAIN,yacd.haishan.me,DIRECT",
    "RULE-SET,private,DIRECT",
    "RULE-SET,reject,REJECT",
    "RULE-SET,icloud,DIRECT",
    "RULE-SET,apple,DIRECT",
    "RULE-SET,google,节点选择",
    "RULE-SET,proxy,节点选择",
    "RULE-SET,direct,DIRECT",
    "RULE-SET,lancidr,DIRECT",
    "RULE-SET,cncidr,DIRECT",
    "RULE-SET,telegramcidr,节点选择",
    "GEOIP,LAN,DIRECT",
    "GEOIP,CN,DIRECT",
    "MATCH,节点选择",
  ];

  return config;
}
