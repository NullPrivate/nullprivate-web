---
title: "Legal Compliance Issues"
pubDate: "2024-12-09 11:05:21 +0800"
categories: Guide
tags: [Guide, blog]
---

- [ ] Legal Compliance Issues

- [Telecom Business Classification Directory (2015 Edition)](https://www.cttic.cn/info/2376)
- [Regulations of the People's Republic of China on Telecommunications](http://www.legaldaily.com.cn/IT/content/2022-06/16/content_8744077.html)
- [Administrative Measures for the Licensing of Telecommunications Business Operations](https://www.gov.cn/zhengce/2022-08/23/content_5722715.htm)
- [Alibaba's Explanation on Default Closure of Port 53](https://www.aliyun.com/noticelist/articleid/1073494210.html?spm=5176.ecscore_sg.0.0.240d4df5nJSJ9b)

Required: `B26-1 Internet Domain Resolution Service License`

## Precautions

Avoid discussing:

- DNS Domain Resolution Service
- Ad Blocking

## References

Value-Added Telecommunications Services: B26-1 Internet Domain Resolution Service Business

Article 6: Operating value-added telecommunications services shall meet the following conditions:

(1) The operator is a company established in accordance with the law;

(2) It has funds and professional personnel appropriate for the business activities;

(3) It has the credibility or capability to provide long-term services to users;

(4) For operations within a province, autonomous region, or municipality directly under the Central Government, the minimum registered capital is 100,000 RMB; for operations nationwide or across provinces, autonomous regions, or municipalities directly under the Central Government, the minimum registered capital is 1,000,000 RMB;

(5) It has necessary premises, facilities, and technical plans;

(6) The company and its major investors and key management personnel have not been included in the list of discredited telecommunications business operators;

(7) Other conditions stipulated by the state.

Internet domain resolution is the process of mapping internet domain names to IP addresses.

Internet domain resolution service business refers to the service that, through setting up domain resolution servers and corresponding software on the internet, realizes the conversion between internet domain names and IP addresses.

Domain resolution services include authoritative resolution services and recursive resolution services.

- Authoritative resolution refers to providing domain resolution services for root domains, top-level domains, and other levels of domains.
- Recursive resolution refers to the service that achieves the correspondence between domain names and IP addresses by querying local caches or authoritative resolution service systems.

**Internet domain resolution service specifically refers to recursive resolution service here.**

If not providing recursive resolution services to the public and only using it within a specific internal scope, how to operate?

You can open server port 53 and take necessary technical measures to ensure it is only used within the local area network.

IV. Relevant Policies and Regulations Requirements 《Administrative Measures for the Licensing of Telecommunications Business Operations》

Article 46: Violations of the provisions in Article 16, Paragraph 1, or Article 28, Paragraph 1 of these Measures, by operating telecommunications services without authorization or beyond the scope, shall be punished in accordance with Article 69 of the Regulations of the People's Republic of China on Telecommunications, and in cases of serious circumstances where a penalty of ordered suspension for rectification is imposed, it shall be directly included in the list of discredited telecommunications business operators.

《Measures for the Administration of Internet Domain Names》

Article 36: Providers of domain resolution services shall comply with relevant laws, regulations, and standards, possess the necessary technical, service, and network and information security assurance capabilities, implement network and information security measures, legally record and retain domain resolution logs, maintenance logs, and change records, and ensure the quality and security of the resolution services. If it involves operating telecommunications services, a telecommunications business operating license shall be obtained in accordance with the law.

《Administrative Measures for the Licensing of Telecommunications Business Operations》

Article 24: Operators of value-added telecommunications services providing access services shall comply with the following provisions: (3) They shall not provide access or agency charging services to units or individuals that have not obtained a business license in accordance with the law or completed the record-filing procedures for non-commercial internet information services.
