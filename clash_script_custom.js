// v1.2.0
function main(config) {
  const allProxies = config.proxies || [];
  const CDN_BASE = "https://cdn.jsdelivr.net/gh/";
  const FLAGS_CDN = `${CDN_BASE}lipis/flag-icons@main/flags/4x3/`;

  const commonRegions = {
    US美国: {
      icon: `${FLAGS_CDN}us.svg`,
      filter: "美|US|United States|美国",
    },
    JP日本: {
      icon: `${FLAGS_CDN}jp.svg`,
      filter: "日本|JP|Japan",
    },
    KR韩国: {
      icon: `${FLAGS_CDN}kr.svg`,
      filter: "韩国|KR|Korea",
    },
    HK香港: {
      icon: `${FLAGS_CDN}hk.svg`,
      filter: "港|HK|hk|Hong Kong",
    },
    TW台湾: {
      icon: `${FLAGS_CDN}tw.svg`,
      filter: "台|TW|Taiwan",
    },
    SG新加坡: {
      icon: `${FLAGS_CDN}sg.svg`,
      filter: "新加坡|SG|Singapore|坡|狮城",
    },
    GB英国: {
      icon: `${FLAGS_CDN}gb.svg`,
      filter: "英国|GB|UK|United Kingdom",
    },
    DE德国: {
      icon: `${FLAGS_CDN}de.svg`,
      filter: "德国|DE|Germany",
    },
    NL荷兰: {
      icon: `${FLAGS_CDN}nl.svg`,
      filter: "荷兰|NL|Netherlands",
    },
  };

  const rareRegions = {
    罕见区域: {
      icon: `${FLAGS_CDN}un.svg`,
      filter: "俄罗斯|RU|Russia|芬兰|FI|Finland|波兰|PL|Poland|越南|VN|Vietnam|哥伦比亚|CO|Colombia|巴西|BR|Brazil|泰国|TH|Thailand|冰岛|IS|Iceland|法国|FR|France|印度|IN|India|澳大利亚|AU|Australia|瑞典|SE|Sweden|伊朗|IR|Iran|土耳其|TR|Turkey|阿根廷|AR|Argentina|墨西哥|MX|Mexico|印度尼西亚|ID|Indonesia|马来西亚|MY|Malaysia|菲律宾|PH|Philippines|加拿大|CA|Canada",
    },
  };

  const allRegions = { ...commonRegions, ...rareRegions };

  const availableRegions = [];
  const regionProxies = {};

  for (const [regionName, regionConfig] of Object.entries(allRegions)) {
    const regex = new RegExp(regionConfig.filter, "i");
    const matchedProxies = allProxies.filter((proxy) => regex.test(proxy.name));

    if (matchedProxies.length > 0) {
      availableRegions.push(regionName);
      regionProxies[regionName] = matchedProxies;
    }
  }

  const commonExcludePattern = Object.values(commonRegions)
    .map((r) => r.filter)
    .join("|");

  const rareExcludePattern = Object.values(rareRegions)
    .map((r) => r.filter)
    .join("|");

  const otherRegex = new RegExp(commonExcludePattern + "|" + rareExcludePattern + "|CN|China", "i");
  const otherProxies = allProxies.filter(
    (proxy) => !otherRegex.test(proxy.name)
  );
  const hasOtherNodes = otherProxies.length > 0;

  const GLOBAL_STRATEGIES = [
    "自动选择",
    "自动回退",
    "负载均衡-轮询",
    "负载均衡-哈希",
    "负载均衡-粘滞",
    "手动切换",
  ];

  const proxyGroups = [];

  const nodeSelectionProxies = [];
  availableRegions.forEach((region) => nodeSelectionProxies.push(region));
  if (hasOtherNodes) nodeSelectionProxies.push("其他节点");
  nodeSelectionProxies.push(...GLOBAL_STRATEGIES, "DIRECT");

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
    "exclude-filter": "CN|China|中国|国内|cn",
    type: "url-test",
    interval: 300,
    tolerance: 50,
  });

  proxyGroups.push({
    name: "自动回退",
    icon: `${CDN_BASE}shindgewongxj/WHATSINStash@master/icon/fallback.png`,
    "include-all": true,
    "exclude-filter": "CN|China|中国|国内|cn",
    type: "fallback",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
  });

  proxyGroups.push({
    name: "负载均衡-轮询",
    icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg`,
    "include-all": true,
    "exclude-filter": "CN|China|中国|国内|cn",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "round-robin",
  });

  proxyGroups.push({
    name: "负载均衡-哈希",
    icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg`,
    "include-all": true,
    "exclude-filter": "CN|China|中国|国内|cn",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "consistent-hashing",
  });

  proxyGroups.push({
    name: "负载均衡-粘滞",
    icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg`,
    "include-all": true,
    "exclude-filter": "CN|China|中国|国内|cn",
    type: "load-balance",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    strategy: "sticky-sessions",
  });

  proxyGroups.push({
    name: "手动切换",
    icon: `${CDN_BASE}shindgewongxj/WHATSINStash@master/icon/select.png`,
    "include-all": true,
    "exclude-filter": "CN|China|中国|国内|cn",
    type: "select",
  });

  for (const [regionName, regionConfig] of Object.entries(allRegions)) {
    if (availableRegions.includes(regionName)) {
      const regionStrategyProxies = [
        `${regionName}-自动选择`,
        `${regionName}-自动回退`,
        `${regionName}-负载均衡-轮询`,
        `${regionName}-负载均衡-哈希`,
        `${regionName}-负载均衡-粘滞`,
        `${regionName}-手动切换`,
        "手动切换",
      ];

      proxyGroups.push({
        name: regionName,
        icon: regionConfig.icon,
        type: "select",
        proxies: regionStrategyProxies,
      });

      proxyGroups.push({
        name: `${regionName}-自动选择`,
        icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Auto.png`,
        "include-all": true,
        filter: regionConfig.filter,
        type: "url-test",
        interval: 300,
        tolerance: 50,
      });

      proxyGroups.push({
        name: `${regionName}-自动回退`,
        icon: `${CDN_BASE}shindgewongxj/WHATSINStash@master/icon/fallback.png`,
        "include-all": true,
        filter: regionConfig.filter,
        type: "fallback",
        url: "https://www.gstatic.com/generate_204",
        interval: 300,
      });

      proxyGroups.push({
        name: `${regionName}-负载均衡-轮询`,
        icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg`,
        "include-all": true,
        filter: regionConfig.filter,
        type: "load-balance",
        url: "https://www.gstatic.com/generate_204",
        interval: 300,
        strategy: "round-robin",
      });

      proxyGroups.push({
        name: `${regionName}-负载均衡-哈希`,
        icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg`,
        "include-all": true,
        filter: regionConfig.filter,
        type: "load-balance",
        url: "https://www.gstatic.com/generate_204",
        interval: 300,
        strategy: "consistent-hashing",
      });

      proxyGroups.push({
        name: `${regionName}-负载均衡-粘滞`,
        icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg`,
        "include-all": true,
        filter: regionConfig.filter,
        type: "load-balance",
        url: "https://www.gstatic.com/generate_204",
        interval: 300,
        strategy: "sticky-sessions",
      });

      proxyGroups.push({
        name: `${regionName}-手动切换`,
        icon: `${CDN_BASE}shindgewongxj/WHATSINStash@master/icon/select.png`,
        "include-all": true,
        filter: regionConfig.filter,
        type: "select",
      });
    }
  }

  if (hasOtherNodes) {
    const otherStrategyProxies = [
      "其他节点-自动选择",
      "其他节点-自动回退",
      "其他节点-负载均衡-轮询",
      "其他节点-负载均衡-哈希",
      "其他节点-负载均衡-粘滞",
      "其他节点-手动切换",
      "手动切换",
    ];

    proxyGroups.push({
      name: "其他节点",
      icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Global.png`,
      type: "select",
      proxies: otherStrategyProxies,
    });

    const commonFilterRegex = new RegExp(commonExcludePattern, "i");
    const rareFilterRegex = new RegExp(rareExcludePattern, "i");

    proxyGroups.push({
      name: "其他节点-自动选择",
      icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Auto.png`,
      "include-all": true,
      "exclude-filter": commonExcludePattern + "|" + rareExcludePattern,
      type: "url-test",
      interval: 300,
      tolerance: 50,
    });

    proxyGroups.push({
      name: "其他节点-自动回退",
      icon: `${CDN_BASE}shindgewongxj/WHATSINStash@master/icon/fallback.png`,
      "include-all": true,
      "exclude-filter": commonExcludePattern + "|" + rareExcludePattern,
      type: "fallback",
      url: "https://www.gstatic.com/generate_204",
      interval: 300,
    });

    proxyGroups.push({
      name: "其他节点-负载均衡-轮询",
      icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg`,
      "include-all": true,
      "exclude-filter": commonExcludePattern + "|" + rareExcludePattern,
      type: "load-balance",
      url: "https://www.gstatic.com/generate_204",
      interval: 300,
      strategy: "round-robin",
    });

    proxyGroups.push({
      name: "其他节点-负载均衡-哈希",
      icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg`,
      "include-all": true,
      "exclude-filter": commonExcludePattern + "|" + rareExcludePattern,
      type: "load-balance",
      url: "https://www.gstatic.com/generate_204",
      interval: 300,
      strategy: "consistent-hashing",
    });

    proxyGroups.push({
      name: "其他节点-负载均衡-粘滞",
      icon: `${CDN_BASE}clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg`,
      "include-all": true,
      "exclude-filter": commonExcludePattern + "|" + rareExcludePattern,
      type: "load-balance",
      url: "https://www.gstatic.com/generate_204",
      interval: 300,
      strategy: "sticky-sessions",
    });

    proxyGroups.push({
      name: "其他节点-手动切换",
      icon: `${CDN_BASE}shindgewongxj/WHATSINStash@master/icon/select.png`,
      "include-all": true,
      "exclude-filter": commonExcludePattern + "|" + rareExcludePattern,
      type: "select",
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

  const finalProxies = ["节点选择"];
  availableRegions.forEach((region) => finalProxies.push(region));
  if (hasOtherNodes) finalProxies.push("其他节点");
  finalProxies.push(...GLOBAL_STRATEGIES, "DIRECT");

  proxyGroups.push({
    name: "漏网之鱼",
    icon: `${CDN_BASE}Koolson/Qure@master/IconSet/Color/Final.png`,
    type: "select",
    proxies: finalProxies,
  });

  const globalProxies = ["节点选择", ...GLOBAL_STRATEGIES];
  availableRegions.forEach((region) => globalProxies.push(region));
  if (hasOtherNodes) globalProxies.push("其他节点");
  globalProxies.push("广告拦截", "应用净化", "漏网之鱼");

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
