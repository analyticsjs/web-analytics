## [0.1.5](https://github.com/analyticsjs/web-analytics/compare/core@0.1.4...core@0.1.5) (2023-06-27)


### Bug Fixes

* **core:** disabled auto pageview to prevent duplicate tracking ([dc8ffc6](https://github.com/analyticsjs/web-analytics/commit/dc8ffc642d3ec91dbcb86c6300e21f5ed1e24afa))



## [0.1.4](https://github.com/analyticsjs/web-analytics/compare/core@0.1.3...core@0.1.4) (2023-06-25)


### Bug Fixes

* **core:** fix debug log error for loadSdk ([757068c](https://github.com/analyticsjs/web-analytics/commit/757068c35cfea6c5fd56981e77dadd602e86aea9))
* **core:** if fromUrl is not specified, it defaults to an empty string ([dc050d1](https://github.com/analyticsjs/web-analytics/commit/dc050d1787755cf636129842f24323bf09eb036a))



## [0.1.3](https://github.com/analyticsjs/web-analytics/compare/core@0.1.2...core@0.1.3) (2023-06-23)


### Features

* **core:** export a constant of supported platforms ([529d3e1](https://github.com/analyticsjs/web-analytics/commit/529d3e171f2a8597b5c68cd1017adfd8a3c3fee9))
* **core:** export the Analytics class ([7632dd9](https://github.com/analyticsjs/web-analytics/commit/7632dd92927e2051b6e8703efcb4d3a283b504be))



## [0.1.2](https://github.com/analyticsjs/web-analytics/compare/core@0.1.1...core@0.1.2) (2023-05-03)


### Bug Fixes

* **core:** no need to throw errors during server-side generate ([4b54a65](https://github.com/analyticsjs/web-analytics/commit/4b54a65bf1b1bcc4059f30e4d4b3b0386ae09127))



## [0.1.1](https://github.com/analyticsjs/web-analytics/compare/core@0.1.0...core@0.1.1) (2023-04-24)


### Bug Fixes

* **core:** export types ([5b4cff1](https://github.com/analyticsjs/web-analytics/commit/5b4cff1bbd461d5a5ad072feaa4509335e3d5f28))



# 0.1.0 (2023-04-22)

### Features

- **core:** add debug decorator ([8905d36](https://github.com/analyticsjs/web-analytics/commit/8905d367174b6e5131fbd1f5b056b9bf3c102109))
- **core:** add interceptor ([7014477](https://github.com/analyticsjs/web-analytics/commit/7014477ecaeea79b77096d3bb6b0d6b2713f6fc2))
- **core:** add node id support for track event ([bc3acd4](https://github.com/analyticsjs/web-analytics/commit/bc3acd41673eccd5afdfa00dbc6b9a2f83fe8b5e))
- **core:** add setAccount method ([0daa313](https://github.com/analyticsjs/web-analytics/commit/0daa31399e13d0997252d48e3ec76422f3167721))
- **core:** add trackEvent ([f5b2cce](https://github.com/analyticsjs/web-analytics/commit/f5b2ccea14bd0799133b54acb488f7966e5dbc43))
- **core:** improve the log of trackEvent ([e25bc9f](https://github.com/analyticsjs/web-analytics/commit/e25bc9f2a621ed8376d9c487c41833deb77e9726))
- **core:** loadSdk is now a private method ([9da1a8a](https://github.com/analyticsjs/web-analytics/commit/9da1a8ab83c7f4e567b80d5d98570114336a1e41))
- **core:** provides functional instantiation methods ([4538263](https://github.com/analyticsjs/web-analytics/commit/45382631fa340853ced4e71baee8a11dad8def2e))
- **core:** remove the debug decoration of setAccount ([39f0798](https://github.com/analyticsjs/web-analytics/commit/39f0798144283ebfa4f4a00fd2d7526d561895fb))
- **core:** the debug decorator supports capturing arguments of the method ([94b1632](https://github.com/analyticsjs/web-analytics/commit/94b16323972aaae509877c4d9296a7b750895058))
- **core:** the trackPageview method internally differentiates the options for different platforms ([5f9a913](https://github.com/analyticsjs/web-analytics/commit/5f9a913edd9ddfd6af13cbde56b58000b9478ef5))
