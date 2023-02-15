import axios from 'axios'
import type { CreatePostDto } from '../../domain/posts/model/CreatePostDto'
import type { PostDto } from '../../domain/posts/model/PostDto'
export const PostAPIImpl = {
    createPost: async ({
        title,
        description,
        images,
    }: CreatePostDto): Promise<PostDto> => {
        const { data } = await axios.post('/posts', {
            title,
            description,
            images,
        })
        return data
    },
    fetchAllPosts: async (): Promise<Array<PostDto>> => {
        // 임시로 3초 뒤에 return하는 promise 생성
        return new Promise<Array<PostDto>>((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 0,
                        title: '코로나19 대응을 위한 건강 습관',
                        description: `요즘 전 세계적으로 코로나19의 확산으로 우리의 건강을 위해 각종 건강 습관을 준수할 필요가 있습니다. \n첫째로, 손을 자주 씻어야 합니다.
                             둘째로, 감기조심을 해야합니다. 세째로, 건강한 식습관을 유지해야 합니다. 최종적으로, 건강한 수면습관을 유지해야 합니다. 우리는 모두 이 건강 습관을 준수하여 코로나19에 대한 대응을 할 수 있습니다.`,
                        images: [
                            'https://picsum.photos/1200/600',
                            'https://picsum.photos/1300/700',
                            'https://picsum.photos/500',
                        ],
                        createdAt: new Date(2023, 0, 1, 32, 14).toISOString(),
                        updatedAt: new Date(2023, 0, 22, 22, 55).toISOString(),
                    },
                    {
                        id: 1,
                        title: '우리의 마음과 육체를 강화하는 운동의 중요성',
                        description: `요즘, 사람들은 바쁜 스케줄과 수많은 스트레스로 인해 건강한 생활을 유지하는 것이 어려워졌습니다. 하지만, 운동은 우리의 마음과 육체를 강화하는 것이 중요합니다. 운동을 하면 피로가 풀리고, 집중력이 향상되고, 기분이 좋아집니다.

                        운동은 다양한 형태로 할 수 있습니다. 예를 들어, 산책을 하거나 요가를 하거나, 그리고 짐승처럼 놀다와 같이 활동적인 운동을 할 수 있습니다. 중요한 것은 자신에게 맞는 운동을 찾는 것입니다. 운동을 꾸준히 하면 건강한 생활을 유지할 수 있고, 또한 긴장과 스트레스를 해소할 수 있습니다.
                        
                        따라서, 우리는 꾸준히 운동을 하면서 마음과 육체를 강화하고 건강하게 유지해야합니다.`,
                        images: [
                            'https://picsum.photos/600/1200',
                            'https://picsum.photos/700/1300',
                            'https://picsum.photos/600',
                        ],
                        createdAt: new Date(2023, 1, 5, 26, 51).toISOString(),
                        updatedAt: new Date(2023, 1, 5, 26, 51).toISOString(),
                    },
                    {
                        id: 2,
                        title: '코로나19 대응을 위한 건강 습관',
                        description:
                            '요즘 전 세계적으로 코로나19의 확산으로 우리의 건강을 위해 각종 건강 습관을 준수할 필요가 있습니다. 첫째로, 손을 자주 씻어야 합니다. 둘째로, 감기조심을 해야합니다. 세째로, 건강한 식습관을 유지해야 합니다. 최종적으로, 건강한 수면습관을 유지해야 합니다. 우리는 모두 이 건강 습관을 준수하여 코로나19에 대한 대응을 할 수 있습니다.',
                        images: [
                            'https://picsum.photos/1200/600',
                            'https://picsum.photos/1300/700',
                            'https://picsum.photos/500',
                        ],
                        createdAt: new Date(2023, 0, 1, 32, 14).toISOString(),
                        updatedAt: new Date(2023, 0, 22, 22, 55).toISOString(),
                    },
                    {
                        id: 3,
                        title: '우리의 마음과 육체를 강화하는 운동의 중요성',
                        description: `요즘, 사람들은 바쁜 스케줄과 수많은 스트레스로 인해 건강한 생활을 유지하는 것이 어려워졌습니다. 하지만, 운동은 우리의 마음과 육체를 강화하는 것이 중요합니다. 운동을 하면 피로가 풀리고, 집중력이 향상되고, 기분이 좋아집니다.

                        운동은 다양한 형태로 할 수 있습니다. 예를 들어, 산책을 하거나 요가를 하거나, 그리고 짐승처럼 놀다와 같이 활동적인 운동을 할 수 있습니다. 중요한 것은 자신에게 맞는 운동을 찾는 것입니다. 운동을 꾸준히 하면 건강한 생활을 유지할 수 있고, 또한 긴장과 스트레스를 해소할 수 있습니다.
                        
                        따라서, 우리는 꾸준히 운동을 하면서 마음과 육체를 강화하고 건강하게 유지해야합니다.`,
                        images: [
                            'https://picsum.photos/600/1200',
                            'https://picsum.photos/700/1300',
                            'https://picsum.photos/600',
                        ],
                        createdAt: new Date(2023, 1, 5, 26, 51).toISOString(),
                        updatedAt: new Date(2023, 1, 5, 26, 51).toISOString(),
                    },
                    {
                        id: 2,
                        title: '코로나19 대응을 위한 건강 습관',
                        description:
                            '요즘 전 세계적으로 코로나19의 확산으로 우리의 건강을 위해 각종 건강 습관을 준수할 필요가 있습니다. 첫째로, 손을 자주 씻어야 합니다. 둘째로, 감기조심을 해야합니다. 세째로, 건강한 식습관을 유지해야 합니다. 최종적으로, 건강한 수면습관을 유지해야 합니다. 우리는 모두 이 건강 습관을 준수하여 코로나19에 대한 대응을 할 수 있습니다.',
                        images: [
                            'https://picsum.photos/1200/600',
                            'https://picsum.photos/1300/700',
                            'https://picsum.photos/500',
                        ],
                        createdAt: new Date(2023, 0, 1, 32, 14).toISOString(),
                        updatedAt: new Date(2023, 0, 22, 22, 55).toISOString(),
                    },
                    {
                        id: 3,
                        title: '우리의 마음과 육체를 강화하는 운동의 중요성',
                        description: `요즘, 사람들은 바쁜 스케줄과 수많은 스트레스로 인해 건강한 생활을 유지하는 것이 어려워졌습니다. 하지만, 운동은 우리의 마음과 육체를 강화하는 것이 중요합니다. 운동을 하면 피로가 풀리고, 집중력이 향상되고, 기분이 좋아집니다.

                        운동은 다양한 형태로 할 수 있습니다. 예를 들어, 산책을 하거나 요가를 하거나, 그리고 짐승처럼 놀다와 같이 활동적인 운동을 할 수 있습니다. 중요한 것은 자신에게 맞는 운동을 찾는 것입니다. 운동을 꾸준히 하면 건강한 생활을 유지할 수 있고, 또한 긴장과 스트레스를 해소할 수 있습니다.
                        
                        따라서, 우리는 꾸준히 운동을 하면서 마음과 육체를 강화하고 건강하게 유지해야합니다.`,
                        images: [
                            'https://picsum.photos/600/1200',
                            'https://picsum.photos/700/1300',
                            'https://picsum.photos/600',
                        ],
                        createdAt: new Date(2023, 1, 5, 26, 51).toISOString(),
                        updatedAt: new Date(2023, 1, 5, 26, 51).toISOString(),
                    },
                    {
                        id: 4,
                        title: '코로나19 대응을 위한 건강 습관',
                        description:
                            '요즘 전 세계적으로 코로나19의 확산으로 우리의 건강을 위해 각종 건강 습관을 준수할 필요가 있습니다. 첫째로, 손을 자주 씻어야 합니다. 둘째로, 감기조심을 해야합니다. 세째로, 건강한 식습관을 유지해야 합니다. 최종적으로, 건강한 수면습관을 유지해야 합니다. 우리는 모두 이 건강 습관을 준수하여 코로나19에 대한 대응을 할 수 있습니다.',
                        images: [
                            'https://picsum.photos/1200/600',
                            'https://picsum.photos/1300/700',
                            'https://picsum.photos/500',
                        ],
                        createdAt: new Date(2023, 0, 1, 32, 14).toISOString(),
                        updatedAt: new Date(2023, 0, 22, 22, 55).toISOString(),
                    },
                    {
                        id: 5,
                        title: '우리의 마음과 육체를 강화하는 운동의 중요성',
                        description: `요즘, 사람들은 바쁜 스케줄과 수많은 스트레스로 인해 건강한 생활을 유지하는 것이 어려워졌습니다. 하지만, 운동은 우리의 마음과 육체를 강화하는 것이 중요합니다. 운동을 하면 피로가 풀리고, 집중력이 향상되고, 기분이 좋아집니다.

                        운동은 다양한 형태로 할 수 있습니다. 예를 들어, 산책을 하거나 요가를 하거나, 그리고 짐승처럼 놀다와 같이 활동적인 운동을 할 수 있습니다. 중요한 것은 자신에게 맞는 운동을 찾는 것입니다. 운동을 꾸준히 하면 건강한 생활을 유지할 수 있고, 또한 긴장과 스트레스를 해소할 수 있습니다.
                        
                        따라서, 우리는 꾸준히 운동을 하면서 마음과 육체를 강화하고 건강하게 유지해야합니다.`,
                        images: [
                            'https://picsum.photos/600/1200',
                            'https://picsum.photos/700/1300',
                            'https://picsum.photos/600',
                        ],
                        createdAt: new Date(2023, 1, 5, 26, 51).toISOString(),
                        updatedAt: new Date(2023, 1, 5, 26, 51).toISOString(),
                    },
                ])
            }, 3000)
        })
        // TODO: API 완성되면 실제 API로 변경
    },
}
