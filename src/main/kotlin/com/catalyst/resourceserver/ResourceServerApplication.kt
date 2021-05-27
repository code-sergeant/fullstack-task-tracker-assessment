package com.catalyst.resourceserver

import com.catalyst.resourceserver.api.TaskModel
import com.catalyst.resourceserver.api.TasksRepository
import org.springframework.boot.ApplicationRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class ResourceServerApplication {

    @Bean
    fun run(repository: TasksRepository) = ApplicationRunner {
        repository.save(
            TaskModel(
                title = "Example Task"
            )
        )
    }
}

fun main(args: Array<String>) {
    runApplication<ResourceServerApplication>(*args)
}
