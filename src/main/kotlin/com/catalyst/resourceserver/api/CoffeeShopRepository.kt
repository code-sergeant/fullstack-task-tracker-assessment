package com.catalyst.resourceserver.api

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "coffeeshops", path = "coffeeshops")
interface CoffeeShopRepository: JpaRepository<CoffeeShopModel, Long> {}