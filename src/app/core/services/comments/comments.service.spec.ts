import { TestBed } from '@angular/core/testing';
import { MockService } from 'ng-mocks';
import { lastValueFrom, of } from 'rxjs';
import { SharedModulesModule } from 'src/app/shared/modules/shared-modules.module';
import { mockComments } from 'tests/mock-arrays/mock-comments-array';
import { CommentStub } from 'tests/stub-dto/comment.stub';
import { CommentDTO } from '../../dto/comment.dto';
import { ApiCallService } from '../api-call/api-call.service';

import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let apiCallServiceMock = MockService(ApiCallService);

  const commentDto = new CommentStub;
  const comments = mockComments;
  const commentsUrl = '/comments';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModulesModule,
      ],
      providers: [
        {
          provide: ApiCallService,
          useValue: apiCallServiceMock,
        }
      ],
    });
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('apiCallServiceMock', () => {
    it('should be defined', () => {
      expect(apiCallServiceMock).toBeDefined();
    });
  });

  describe('create method', () => {
    it('should have a create method', () => {
      expect(service.create).toBeDefined();
      expect(service.create).toBeInstanceOf(Function);
    });
    it('should call ApiCallService post method', async () => {
      apiCallServiceMock.post = (jest.fn(() => of(commentDto as CommentDTO))) as any;
      const bookId = 'randomString1';
      const comment = await lastValueFrom(service.create(commentDto, bookId));
      expect(apiCallServiceMock.post).toHaveBeenCalled()
      expect(apiCallServiceMock.post).toHaveBeenCalledWith(commentsUrl, {bookId, commentDto});
      expect(comment.content).toBe(commentDto.content)
    });
  });
});
